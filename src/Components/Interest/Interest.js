import Interest from './Interest.hbs';

export class InterestComponent {
    static render(props) {
        return Interest({interestText: props.interestText});
    }
}