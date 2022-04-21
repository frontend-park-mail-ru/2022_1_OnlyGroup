import router, {APP_PATHS} from './Modules/Router.js';
import loginController from './Controllers/LoginController/LoginController';
import registerController from './Controllers/RegisterController/RegisterController';
import './style.scss';

router.register(APP_PATHS.loginPage, loginController);
router.register(APP_PATHS.registerPage, registerController);

router.start();
