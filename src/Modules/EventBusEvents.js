export const API_FAILED = 'api-failed';
export const LOGO_CLICK = 'logo-click';
export const LOGIN_EVENTS = {
    login: 'action-login',
    register: 'action-register',
    logout: 'action-logout',
    userNotLoggined: 'user-unloginned',
    userValidationFailed: 'user-validation-failed',
    userLoggined: 'user-loggined',
    clearForm: 'clear-form',
};

export const PHOTO_EVENTS = {
    photoGetID: 'photo-get-',
    photoReadyID: 'photo-ready-',
    avatarGetID: 'avatar-get-',
    avatarReadyID: 'avatar-ready-',
};

export const FEED_EVENTS = {
    like: 'action-like',
    dislike: 'action-dislike',
    activeUserLoadMin: 'activeUser-load-min',
    activeUserReadyMin: 'activeUser-ready-min',
    noPhotos: 'no-photos',
    photosReady: 'photos-ready',
    infoReady: 'info-ready',
    noCandiates: 'no-candidates',
};
