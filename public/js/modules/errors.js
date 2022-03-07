export class Errors {
    static setErrorVisible = (input, visibility, text) => {
        let error = document.querySelector(`.${input.classList.item(0)}__error`);
        error.textContent = text;
        error.style.visibility = visibility;
    };
}
