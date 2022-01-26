import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './AddContactForm.module.css';
import {api} from '../../../api/api';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {validateEmail, validateNameLength, validatePhone} from '../../../utils/validate';
import {generateID} from '../../../utils/utils';

interface IProps {
    setAddedMode: (value: boolean) => void
    busyIdArray: number[]
    setIsInit: (value: boolean) => void
}

export const AddContactForm: React.FC<IProps> = React.memo(props => {

    const
        {setAddedMode, busyIdArray, setIsInit} = props,
        [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [nameError, setNameError] = useState(''),
        [emailError, setEmailError] = useState(''),
        [phoneError, setPhoneError] = useState('');

    const inputEventHandlerWithErrorReset = useCallback((func: (value: string) => void, value: string) => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        func(value);
    },[]);

    const nameChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setName, e.currentTarget.value);
    }, [inputEventHandlerWithErrorReset]);

    const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setEmail, e.currentTarget.value);
    }, [inputEventHandlerWithErrorReset]);

    const phoneChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setPhone, e.currentTarget.value);
    }, [inputEventHandlerWithErrorReset]);

    const addContact = useCallback(async () => {

        const id = generateID(busyIdArray);

        if (validateNameLength(name)) {
            setNameError('Name length must be more than 2 characters');
        } else if (validateEmail(email) || '') {
            setEmailError('Please enter a valid email');
        } else if (validatePhone(phone)) {
            setPhoneError('Please enter a valid phone number');
        } else {
            await api.addContact({id, name, email, phone});
            setAddedMode(false);
            setIsInit(false);
        }

    }, [name, email, phone, busyIdArray, setAddedMode, setIsInit]);

    const cancel = useCallback(() => {
        setAddedMode(false);
    }, [setAddedMode]);

    return (
        <div className={s.addContactForm__wrapper}>
            <div className={s.addContactForm__container}>
                <h2 className={s.addContactForm__title}>Create new contact</h2>
                <Input className={s.addContactForm__input}
                       value={name}
                       type={'text'}
                       label={'Contact name'}
                       onChange={nameChangeHandler}
                       error={nameError}/>
                <Input className={s.addContactForm__input}
                       value={email}
                       type={'email'}
                       label={'Contact email'}
                       onChange={emailChangeHandler}
                       error={emailError}/>
                <Input className={s.addContactForm__input}
                       value={phone}
                       type={'tel'}
                       label={'Contact tel number'}
                       onChange={phoneChangeHandler}
                       error={phoneError}/>
                <div className={s.addContactForm__buttonsBlock}>
                    <Button onClick={addContact}
                            title={'Create contact'}
                            type={'primary'}/>
                    <Button onClick={cancel}
                            title={'Cancel'}
                            type={'secondary'}/>
                </div>
            </div>
        </div>
    );
});