import router from './Modules/Router.js';
import loginController from './controllers/loginController/LoginController';
import './style.scss';

router.register('/', loginController);

router.start();
