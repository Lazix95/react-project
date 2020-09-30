// Every validation function will return JS Object with attributes "error and message", if there is no error message will be null;

export const validatePassword = ({password, confirmPassword, maxLength, minLength}) => {
    minLength = minLength ? minLength : 3;
    maxLength = maxLength ? maxLength : 100;
    if (password !== confirmPassword) {
        return {error: true, message: 'Password Missmatch'}
    } else if (password < minLength) {
        return { error: true, message: `Password must be long at last ${minLength} characters.` }
    } else if (password > maxLength) {
        return { error: true, message: `Password cannot be longer then ${maxLength} characters.` }
    } else {
        return { error: false, message: null }
    }
};

export const validateEmail = ({email}) => {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let result = regex.test(email);
    return {error: !result}
};