import {ButtonComponent} from './Components/Button/Button.js';
import { FeedPhotoCardComponent } from './Components/FeedPhotoCard/FeedPhotoCard.js';
import { InputComponent } from './Components/Input/Input.js';
import { InterestComponent } from './Components/Interest/Interest.js';
import { LayoutComponent } from './Components/Layout/Layout.js';
import { LogoComponent } from './Components/Logo/Logo.js';
import { MessageComponent } from './Components/Message/Message.js';
import { TextWithIconComponent } from './Components/TextWithIcon/TextWithIcon.js';
import { ButtonWithIconComponent } from './Components/ButtonWithIcon/ButtonWithIcon.js';
import { TextComponent } from './Components/Text/Text.js';
import { InputWithIconComponent } from './Components/InputWithIcon/InputWithIcon.js';
import './style.scss';

const root = document.getElementById('root');

root.innerHTML = InputWithIconComponent.render({iconSrc: './static/images/arrow.png', inputType: 'text', inputId: 'id'});