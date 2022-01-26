import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './EditContactForm.module.css';
import {api} from '../../../api/api';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {validateEmail, validateNameLength, validatePhone} from '../../../utils/validate';

interface IProps {
    id: number
    currentName: string
    currentEmail: string
    currentPhone: string
    setEditMode: (value: boolean) => void
    setIsInit: (value: boolean) => void
}

export const EditContactForm: React.FC<IProps> = React.memo(props => {

    const
        {id, currentName, currentEmail, currentPhone, setEditMode, setIsInit} = props,
        [name, setName] = useState(currentName),
        [email, setEmail] = useState(currentEmail),
        [phone, setPhone] = useState(currentPhone),
        [nameError, setNameError] = useState(''),
        [emailError, setEmailError] = useState(''),
        [phoneError, setPhoneError] = useState('');

    const inputEventErrorReset = useCallback((func: (value: string) => void, value: string) => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        func(value);
    }, []);

    const nameChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventErrorReset(setName, e.currentTarget.value);
    }, [inputEventErrorReset]);

    const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventErrorReset(setEmail, e.currentTarget.value);
    }, [inputEventErrorReset]);

    const phoneChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventErrorReset(setPhone, e.currentTarget.value);
    }, [inputEventErrorReset]);

    const editContact = useCallback(async () => {
        if (validateNameLength(name)) {
            setNameError('Name length must be more than 2 characters');
        } else if (validateEmail(email) || '') {
            setEmailError('Please enter a valid email');
        } else if (validatePhone(phone)) {
            setPhoneError('Please enter a valid phone number');
        } else {
            await api.editContact(id, {id, name, email, phone});
            setEditMode(false);
            setIsInit(false);
        }
    }, [name, email, phone, id, setEditMode, setIsInit]);

    const cancel = useCallback(() => {
        setEditMode(false);
    }, [setEditMode]);

    return (
        <div className={s.editContactForm__wrapper}>
            <div className={s.editContactForm__container}>
                <h2 className={s.editContactForm__title}>Edit contact</h2>
                <Input className={s.editContactForm__input}
                       value={name}
                       type={'text'}
                       label={'Contact name'}
                       onChange={nameChangeHandler}
                       error={nameError}/>
                <Input className={s.editContactForm__input}
                       value={email}
                       type={'email'}
                       label={'Contact email'}
                       onChange={emailChangeHandler}
                       error={emailError}/>
                <Input className={s.editContactForm__input}
                       value={phone}
                       type={'tel'}
                       label={'Contact tel number'}
                       onChange={phoneChangeHandler}
                       error={phoneError}/>
                <div className={s.editContactForm___buttonsBlock}>
                    <Button onClick={editContact}
                            title={'Save changes'}
                            type={'primary'}/>
                    <Button onClick={cancel}
                            title={'Cancel'}
                            type={'secondary'}/>
                </div>
            </div>
        </div>
    );
});