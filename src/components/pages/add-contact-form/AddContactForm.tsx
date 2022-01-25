import React, {ChangeEvent, useState} from 'react';
import s from './AddContactForm.module.css';
import {api} from '../../../api/api';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {validateEmail, validateNameLength, validatePhone} from '../../../utils/validate';

interface IProps {
    setAddedMode: (value: boolean) => void;
    allUserID: number[];
}

export const AddContactForm: React.FC<IProps> = props => {

    const
        {setAddedMode, allUserID} = props,
        [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [nameError, setNameError] = useState(''),
        [emailError, setEmailError] = useState(''),
        [phoneError, setPhoneError] = useState('');

    const generateID = (id: number = 1): number => {
        return (allUserID.some(i => +i === +id))
            ? generateID(id + 1)
            : id
    };

    const inputEventHandlerWithErrorReset = (func: (value: string) => void, value: string) => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        func(value);
    };

    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setName, e.currentTarget.value);
    };

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setEmail, e.currentTarget.value);
    };

    const phoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputEventHandlerWithErrorReset(setPhone, e.currentTarget.value);
    };

    const addContact = async () => {
        const id = generateID();
        if (validateNameLength(name)) {
            setNameError('Name length must be more than 2 characters');
        } else if (validateEmail(email) || '') {
            setEmailError('Please enter a valid email');
        } else if (validatePhone(phone)) {
            setPhoneError('Please enter a valid phone number');
        } else {
            await api.addContact({id, name, email, phone});
            setAddedMode(false);
        }
    };

    const cancel = () => {
        setAddedMode(false);
    };

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
};