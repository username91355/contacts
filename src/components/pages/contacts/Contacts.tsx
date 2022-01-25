import React, {useEffect, useState} from 'react';
import s from './Contacts.module.css';
import {api, IMe} from "../../../api/api";
import {AddContactForm} from "../add-contact-form/AddContactForm";
import {Button} from "../../common/Button/Button";
import {Contact} from '../contact/Contact';
import {Preloader} from "../../common/Preloader/Preloader";

interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string,
}

interface IProps {
    user: IMe | null
    logout: () => void
}

export const Contacts: React.FC<IProps> = props => {

    const {
        user,
        logout
    } = props;

    const [isInit, setIsInit] = useState<boolean>(false);
    const [contacts, setContacts] = useState<IUser[]>([]);
    const [addedMode, setAddedMode] = useState<boolean>(false);
    const [term, setTerm] = useState<string>();
    const allUserID = contacts.map(p => p.id);

    useEffect(() => {
        setIsInit(false)
        api.getContact(term)
            .then(res => {
                setContacts(res);
                setIsInit(true);
            });
    }, [term]);

    return (
        <div className={s.contacts__wrapper}>
            {!isInit && <Preloader />}
            <div>{user && user.email}</div>
            <button onClick={logout}>Logout</button>
            <input onChange={(e) => {
                setTerm(e.currentTarget.value);
            }}/>
            <button>Search</button>
            <div>
                <button onClick={() => {
                    setAddedMode(!addedMode)
                }}>Add
                </button>
                {addedMode ? <AddContactForm setAddedMode={setAddedMode} allUserID={allUserID}/> : null}
            </div>
            <hr/>
            <div className={s.contacts__list}>
                {contacts.map(i => <Contact key={i.id}
                                            id={i.id}
                                            name={i.name}
                                            email={i.email}
                                            phone={i.phone}/>
                )}
            </div>
        </div>
    );
};

//https://my-json-server.typicode.com/username91355/server/contacts