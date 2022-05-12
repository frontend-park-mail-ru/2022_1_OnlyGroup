export const LOGIN_VIEW_NAMES = {
    altVariant: {
        offer: 'Все еще нет аккаунта?',
        linkTitle: 'Зарегистрироваться',
    },
    inputs: {
        email: {
            title: 'Email',
            placeholder: 'Введите email',
        },
        password: {
            title: 'Пароль',
            placeholder: 'Введите пароль',
        },
    },
    button: {
        title: 'Войти',
    },
    errors: {
        wrongEmail: 'Неверный Email',
        passwordRegex: 'Пароль должен содержать строчную и заглавную буквы и цифру',
        loginFail: 'Неверный логин или пароль',
    },
};

export const REGISTER_VIEW_NAMES = {
    altVariant: {
        offer: 'Уже есть аккаунт?',
        linkTitle: 'Войти',
    },
    inputs: {
        email: {
            title: 'Email',
            placeholder: 'Введите email',
        },
        password: {
            title: 'Пароль',
            placeholder: 'Введите пароль',
        },
        passwordVerify: {
            title: 'Пароль ещё раз',
            placeholder: 'Повторите ваш пароль',
        },
    },
    button: {
        title: 'Зарегистрироваться',
    },
    errors: {
        emailUsed: 'Email уже используется',
        passwordMismatch: 'Пароли не совпадают',
    },
};
