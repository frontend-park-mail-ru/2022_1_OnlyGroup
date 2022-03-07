import router from "./router/router.js";
import {SignInViewClass} from "./views/signInPage/SignInViewClass.js";
import {SignUpViewClass} from "./views/signUpPage/SignUpViewClass.js";
import {AppPageViewClass} from "./views/appPage/AppPageViewClass.js";
import {EditProfileViewClass} from "./views/editProfilePage/EditProfileViewClass.js";

router.register('/login', SignInViewClass);
router.register("/registration", SignUpViewClass);
router.register("/profile", AppPageViewClass);
router.register("/profile/settings", EditProfileViewClass);
router.register('/', SignInViewClass);

router.start();
