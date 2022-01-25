import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Input.module.css';

interface IProps extends React.HTMLProps<HTMLInputElement> {
    type: string
    label?: string
    error?: string | null
    onChangeText?: (str: string) => void
    onEnter?: () => void
    className?: string
    classNameLabel?: string
}

export const Input: React.FC<IProps> = props => {

    const {
        type,
        label,
        error,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        className,
        classNameLabel,
        ...restProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        onEnter && e.key === 'Enter' && onEnter()
    };

    return (
        <div className={s.input__wrapper}>
            <div className={`${classNameLabel} ${s.input__label} ${error ? s.error_text : ''}`}>{error || label}</div>
            <input className={`${className} ${s.input__area} ${error ? s.error_input : ''}`}
                   type={type}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   {...restProps}
            />
        </div>
    );
};