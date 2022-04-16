import router from './Modules/Router.js';
import loginController from './controllers/LoginRegisterController/LoginRegisterController';
import './style.scss';

router.register('/', loginController);

router.start();
