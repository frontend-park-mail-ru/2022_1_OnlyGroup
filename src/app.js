import router, {AppPaths} from './Modules/Router.js';
import loginController from './controllers/LoginController/LoginController';
import registerController from './controllers/RegisterController/RegisterController';
import './style.scss';

router.register(AppPaths.loginPage, loginController);
router.register(AppPaths.registerPage, registerController);

router.start();
