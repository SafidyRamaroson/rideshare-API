
const validateEmail = (email)=> {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

module.exports = validateEmail;