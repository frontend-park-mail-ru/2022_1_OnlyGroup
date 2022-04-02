import router from './Modules/router.js';
import loginController from './controllers/loginController/loginController'
import "./style.scss"

router.register("/", loginController)

router.start()
