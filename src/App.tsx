import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import {Contacts} from "./components/pages/contacts/Contacts";
import {Login} from './components/pages/login/Login';
import {api, IMe} from "./api/api";

function App() {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IMe | null>(null);

    const me = async () => {
        await api.me().then(res => {
            setUser(res);
            if(res) {
                setIsAuth(true);
            }
        });
    };

    const logout = () => {
        api.logout().then(res => {
            setUser(res);
            setIsAuth(false);
        });
    };

    useEffect(() => {
        me();
    }, []);

    return (
        <div className={styles.app__wrapper}>
            {
                isAuth
                    ? <Contacts user={user} logout={logout}/>
                    : <Login setIsAuth={setIsAuth} me={me}/>
            }
        </div>
    );
}

export default App;
