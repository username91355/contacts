export const validateNameLength = (name:string) => name.length < 2;
export const validatePasswordLength = (name:string) => name.length < 8;

export const validateEmail = (email: string) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return !reg.test(email);
};

export const validatePhone = (phone: string) => {
    const reg = /^(\+7|7|8|1|\+1)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return !reg.test(phone);
}
