import React, {useCallback, useEffect, useState} from 'react';
import styles from './App.module.css';
import {api, IMe} from '../../api/api';
import {Login} from '../pages/login/Login';
import {Contacts} from '../pages/contacts/Contacts';
import {Preloader} from '../common/Preloader/Preloader';
import {Error} from '../common/error/Error';

export const App: React.FC = () => {

    const
        [isInit, setIsInit] = useState<boolean>(false),
        [isAuth, setIsAuth] = useState<boolean>(false),
        [user, setUser] = useState<IMe | null>(null),
        [error, setError] = useState<string | null>(null);

    const me = useCallback(() => {
        setError(null);
        setIsInit(false);
        api.me()
            .then(res => {
                setUser(res);
                if (res) {
                    setIsAuth(true);
                }
            })
            .then(() => {
                setIsInit(true);
            })
            .catch(err => {
                setError(err.message);
                setIsInit(true);
            })
    }, []);

    const logout = useCallback(() => {
        api.logout().then(() => {
            setUser(null);
            setIsAuth(false);
        });
    }, []);

    useEffect(() => {
        me();
    }, [me]);

    return (
        <div className={styles.app__wrapper}>
            {error && <Error errorMessage={error}/>}
            {
                !isInit
                    ? <Preloader/>
                    : isAuth
                        ? <Contacts user={user} logout={logout}/>
                        : <Login setIsAuth={setIsAuth} me={me}/>
            }
        </div>
    );
};
