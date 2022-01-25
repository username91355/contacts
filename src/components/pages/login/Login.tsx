import React, {ChangeEvent, useState} from 'react';
import {api} from '../../../api/api';
import s from "./Login.module.css";
import {validateEmail, validatePasswordLength} from '../../../utils/validate';
import {Input} from "../../common/Input/Input";
import {Button} from "../../common/Button/Button";

interface IProps {
    setIsAuth: (value: boolean) => void
    me: () => void
}

export const Login: React.FC<IProps> = props => {

    const
        {setIsAuth, me} = props,
        [email, setEmail] = useState<string>(''),
        [emailError, setEmailError] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [passwordError, setPasswordError] = useState<string>('');

    const inputEventErrorReset = (func: (value: string) => void, value: string) => {
        setEmailError('');
        setPasswordError('');
        func(value);
    };

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputEventErrorReset(setEmail, e.currentTarget.value);
    };

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputEventErrorReset(setPassword, e.currentTarget.value);
    };


    const submit = async () => {
        if (validateEmail(email) || '') {
            setEmailError('Please enter a valid email');
        } else if (validatePasswordLength(password)) {
            setPasswordError('Minimum password length 8 characters');
        } else {
            await api.login(email, password).then(console.log);
            await me();
            setIsAuth(true);
        }
    };

    return (
        <div className={s.login__wrapper}>
            <h2 className={s.login__appTitle}>Contacts</h2>
            <h3 className={s.login__title}>Sign in</h3>
            <Input value={email}
                   label={'Enter email'}
                   onChange={emailChangeHandler}
                   type={'email'}
                   error={emailError}
                   className={s.login__input}/>
            <Input value={password}
                   label={'Enter password'}
                   onChange={passwordChangeHandler}
                   type={'password'}
                   error={passwordError}
                   className={s.login__input}/>
            <div className={s.login__buttonBox}>
                <Button title={'Login'}
                        type={'primary'}
                        sizeBtn={'large'}
                        onClick={submit}/>
            </div>
        </div>
    );
};