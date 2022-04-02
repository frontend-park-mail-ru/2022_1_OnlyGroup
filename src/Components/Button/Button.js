import Button from './Button.hbs';

export class ButtonComponent {
    static render(props, callback) {
        const template = Button({buttonId: props.buttonId, buttonText: props.buttonText});
        // Event bus (callback)
        return template;
    }
}
