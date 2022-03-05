"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const errorMessage = document.querySelectorAll('._error');
    const form = document.getElementById('form');
    const button = document.querySelector('.form__button');
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidate(form);

        if (error === 0) {
            button.setAttribute('onclick', "window.location.href='/feed'");
            button.click();
        } 
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            setErrorVisible(input, 'hidden');
            
            if (input.classList.contains('form__login')) {
                if (emailTest(input)) {
                    setErrorVisible(input, 'visible', 'Email is not valid');
                    error++;
                }
            } 
            
            if (input.classList.contains('form__password')) {
                if (passwordTest(input)) {
                    setErrorVisible(input, 'visible', 'Password is not valid');
                    error++;
                } 

                if (!passwordsEqual(input)) {
                    repeatedError('.form__password__error', '.form__repeat__password__error', 'Paswords are not equal');
                    error++;
                }
            } 
            
            if (input.value === '') {
                setErrorVisible(input, 'visible', 'Field must be filled');
                error++;
            }
        }

        return error;
    }

    function setErrorVisible(input, visibility, text) {
        let error = document.querySelector(`.${input.classList.item(0)}__error`);
        error.textContent = text;
        error.style.visibility = visibility;
    }

    function repeatedError(passwordClass, passwordRepeatedClass, text) {
        let passwordInput = document.querySelector(passwordClass);
        let passwordRepeatedInput = document.querySelector(passwordRepeatedClass);
        passwordInput.textContent = text;
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function passwordTest(input) {
        return !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g.test(input.value);
    }

    function passwordsEqual(input) {
        let repeatPasswordInput = document.querySelector('.form__password');
        if (input.value === repeatPasswordInput.value) {
            return true;
        }

        return false;
    }
})