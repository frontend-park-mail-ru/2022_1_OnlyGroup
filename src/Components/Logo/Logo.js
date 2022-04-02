import Logo from './Logo.hbs';

export class LogoComponent {
    static render() {
        const template = Logo({});
        return template;
    }
}