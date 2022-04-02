import InputWithIcon from './InputWIthIcon.hbs';

export class InputWithIconComponent {
    static render(props) {
        return InputWithIcon({iconSrc: props.iconSrc});
    }
}