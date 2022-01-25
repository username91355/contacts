import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/gif/load.gif';

export const Preloader = () => {
    return (
        <div className={s.preloader__wrapper}>
            <img className={s.preloader__img} src={preloader} alt="loader"/>
        </div>
    );
};