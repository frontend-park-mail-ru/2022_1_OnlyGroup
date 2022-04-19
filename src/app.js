import router, {AppPaths} from './Modules/Router.js';
import loginController from './Controllers/LoginController/LoginController';
import registerController from './Controllers/RegisterController/RegisterController';
import './style.scss';

router.register(AppPaths.loginPage, loginController);
router.register(AppPaths.registerPage, registerController);

router.start();
