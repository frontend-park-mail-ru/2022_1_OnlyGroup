import Input from './Input.hbs';

export class InputComponent {
    static render(props) {
        return Input({inputType: props.inputType, inputId: props.inputId});
    }
}