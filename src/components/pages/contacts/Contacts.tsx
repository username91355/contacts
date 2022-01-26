import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import s from './Contacts.module.css';
import {api, IMe, IUser} from '../../../api/api';
import {AddContactForm} from '../add-contact-form/AddContactForm';
import {Contact} from '../contact/Contact';
import {Preloader} from '../../common/Preloader/Preloader';
import {Button} from '../../common/Button/Button';

interface IProps {
    user: IMe | null
    logout: () => void
}

export const Contacts: React.FC<IProps> = React.memo(props => {

        const
            {user, logout} = props,
            [isInit, setIsInit] = useState<boolean>(false),
            [contacts, setContacts] = useState<IUser[]>([]),
            [addedMode, setAddedMode] = useState<boolean>(false),
            [term, setTerm] = useState<string>();

        const busyIdArray = contacts.map(p => p.id);

        useEffect(() => {
            api.getContact(term)
                .then(res => {
                    setContacts(res);
                    setIsInit(true);
                });
        }, [term, isInit]);

        const reverseContacts = useMemo(() => {
            return [...contacts].reverse();
        }, [contacts]);

        const searchStringChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setTerm(e.currentTarget.value);
        }, []);

        const addContactClickHandler = useCallback(() => {
            setAddedMode(!addedMode);
        }, [setAddedMode,addedMode]);

        if (!isInit) return <Preloader/>;

        return (
            <div className={s.contacts__wrapper}>
                <div className={s.contacts__controlPanel}>
                    <div className={s.contacts__controlPanel_searchAndAddContact}>
                        <Button type={'primary'}
                                title={'Add contact'}
                                onClick={addContactClickHandler}/>
                        <input className={s.contacts__controlPanel_searchAndAddContact_searchString}
                               placeholder={'Search...'}
                               onChange={searchStringChangeHandler}/>
                        {
                            addedMode
                                ? <AddContactForm setIsInit={setIsInit} setAddedMode={setAddedMode}
                                                  busyIdArray={busyIdArray}/>
                                : null
                        }
                    </div>
                    <div className={s.contacts__controlPanel_userIngo}>
                        <div>{user && user.email}</div>
                        <Button type={'primary'}
                                title={'Logout'}
                                onClick={logout}/>
                    </div>
                </div>
                <div className={s.contacts__list}>
                    {reverseContacts.map(i => <Contact key={i.id}
                                                       id={i.id}
                                                       name={i.name}
                                                       email={i.email}
                                                       phone={i.phone}
                                                       setIsInit={setIsInit}/>
                    )}
                </div>
            </div>
        );
    }
);