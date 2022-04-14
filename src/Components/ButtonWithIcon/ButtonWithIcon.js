import ButtonWithIcon from './ButtonWithIcon.hbs';

export class ButtonWithIconComponent {
    static render(props, callback) {
        const template = ButtonWithIcon({iconSrc: props.iconSrc, buttonId: props.buttonId, buttonText: props.buttonText});
        // Event bus (callback)
        return template;
    }
}