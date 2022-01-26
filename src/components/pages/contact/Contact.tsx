import React, {useCallback, useState} from 'react';
import s from './Contact.module.css';
import {api} from '../../../api/api';
import {Button} from '../../common/Button/Button';
import {EditContactForm} from '../edit-contact-form/EditContactForm';

interface IProps {
    id: number
    name: string
    email: string
    phone: string
    setIsInit: (value: boolean) => void
}

export const Contact: React.FC<IProps> = React.memo(props => {

    const
        {id, name, email, phone, setIsInit} = props,
        [editMode, setEditMode] = useState(false),
        [showMode, setShowMode] = useState(false);

    const deleteContact = useCallback(async () => {
        await api.removeContact(id);
        setIsInit(false);
    }, [id, setIsInit]);

    return (
        <div className={s.contact__wrapper}>
            {editMode && <EditContactForm id={id}
                                          currentName={name}
                                          currentEmail={email}
                                          currentPhone={phone}
                                          setEditMode={setEditMode}
                                          setIsInit={setIsInit}/>
            }
            <div className={`${s.contact__name_improved} ${showMode ? s.contact__name_improved_active : ''}`}
                 onClick={() => setShowMode(!showMode)}>
                {name}
                {
                    showMode &&
                    <div className={s.contact__popup}>
                        <hr/>
                        <div>Email: {email}</div>
                        <div>Phone: {phone}</div>
                    </div>
                }
            </div>
            <div className={s.contact__name}>{name}</div>
            <div className={s.contact__email}>{email}</div>
            <div className={s.contact__phone}>{phone}</div>
            <Button type={'primary'}
                    title={'Edit'}
                    sizeBtn={'small'} onClick={() => setEditMode(true)}/>
            <Button type={'secondary'}
                    title={'Delete'}
                    sizeBtn={'small'}
                    onClick={deleteContact}/>
        </div>
    );
});