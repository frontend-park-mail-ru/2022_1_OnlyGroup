import router from './Modules/Router.js';
import loginController from './Controllers/LoginController/LoginController';
import './style.scss';

router.register('/', loginController);

router.start();
