import TextWithIcon from './TextWithIcon.hbs';

export class TextWithIconComponent {
    static render(props) {
        return TextWithIcon({iconSrc: props.iconSrc, textContent: props.textContent});
    }
}