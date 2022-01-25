import React, {useState} from 'react';
import {api} from "../../../api/api";
import s from "../contacts/Contacts.module.css";
import {Button} from "../../common/Button/Button";
import {EditContactForm} from "../edit-contact-form/EditContactForm";

interface IProps {
    id: number
    name: string
    email: string
    phone: string
}

export const Contact: React.FC<IProps> = props => {

    const {
        id,
        name,
        email,
        phone
    } = props;

    const [editMode, setEditMode] = useState(false);

    const deleteContact = () => {
        api.removeContact(id);
    };

    return (<> <div className={s.contacts__item}>
        {editMode && <EditContactForm id={id}
                                      currentName={name}
                                      currentEmail={email}
                                      currentPhone={phone}
                                      setEditMode={setEditMode}/>}
                <span>{name}</span>
                <span>{email}</span>
                <span>{phone}</span>
                <Button type={'primary'}
                        title={'Edit'}
                        sizeBtn={'small'} onClick={()=>setEditMode(true)}/>
                <Button type={'secondary'}
                        title={'Delete'}
                        sizeBtn={'small'}
                        onClick={deleteContact}/>
            </div>
    </>);
};