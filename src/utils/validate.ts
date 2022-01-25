export const validateEmail = (email: string) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return !reg.test(email);
};

export const validatePhone = (phone: string) => {
    const reg = /^[a-zA-Z0-9\-().\s]{10,15}$/;
    return !reg.test(phone);
}
export const validateNameLength = (name:string) => name.length < 2;
export const validatePasswordLength = (name:string) => name.length < 8;