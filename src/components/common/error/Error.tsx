import React from 'react';
import s from './Error.module.css';

interface IProps {
    errorMessage: string
}

export const Error: React.FC<IProps> = React.memo(props => {

    const {errorMessage} = props;

    return (
        <div className={s.error__wrapper}>
            <h3>ERROR</h3>
            <div>{errorMessage}</div>
        </div>
    );
});