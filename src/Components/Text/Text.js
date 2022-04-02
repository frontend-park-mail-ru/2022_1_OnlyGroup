import Text from './Text.hbs';

export class TextComponent {
    static render(props) {
        return Text({textContent: props.textContent});
    }
}