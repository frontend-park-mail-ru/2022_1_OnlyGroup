import router from './router/router.js';
import {SignIn} from './views/signIn/signIn.js';
import {SignUp} from './views/signUp/signUp.js';
import {App} from './views/app/app.js';
import {EditProfile}
  from './views/editProfile/editProfile.js';

router.register('/login', SignIn);
router.register('/registration', SignUp);
router.register('/profile', App);
router.register('/profile/settings', EditProfile);
router.register('/', SignIn);

router.start();
