import {ApiResult} from './ApiResult';
import {FetchWrap} from './FetchWrap';

const USERS_API_URL = 'users';
const PROFILES_API_URL = 'profiles';
const LIKES_API_URL = 'likes';
const PROFILE_SHORT_POSTFIX_API_URL = 'shorts';
const PROFILE_CANDIDATE_POSTFIX_API_URL = 'candidates';


/**
 * Api class(fetch wrapped)
 */
export class Api {
    /**
     * Check if user loggined
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static CheckLogin = async () => {
        return FetchWrap.Get(USERS_API_URL);
    }

    /**
     * Login user
     * @param {string}Email
     * @param {string}Password
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static LogIn = async ({Email, Password}) => {
        const request = JSON.stringify({Email, Password});
        return FetchWrap.Put(USERS_API_URL, request);
    }

    /**
     * Logup user
     * @param {string}Email
     * @param {string}Password
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static LogUp = async ({Email, Password}) => {
        const request = JSON.stringify({Email: Email, Password: Password});
        return FetchWrap.Post(USERS_API_URL, request);
    }

    /**
     * Logout user
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static LogOut = async () => {
        return FetchWrap.Delete(USERS_API_URL, async (response) =>{
            return new ApiResult({status: response.status});
        });
    }

    /**
     * Get long profile data
     * @param {number}id
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetLongProfile = async ({id}) => {
        const requestUrl = `${PROFILES_API_URL}/${id.toString()}`;
        return FetchWrap.Get(requestUrl);
    }

    /**
     * Get short profile data
     * @param {number}id
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetShortProfile = async ({id}) => {
        const requestUrl = `${PROFILES_API_URL}/${id.toString()}/${PROFILE_SHORT_POSTFIX_API_URL}`;
        return FetchWrap.Get(requestUrl);
    }

    /**
     * Change user profile info
     * @param {number} userId
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} birthDay
     * @param {string} city
     * @param {[string]} interests
     * @param {string} aboutUser
     * @param {number} gender
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static ChangeProfile = async ({userId, firstName, lastName, birthDay, city, interests, aboutUser, gender}) => {
        const request = JSON.stringify({
            UserId: userId,
            FirstName: firstName,
            LastName: lastName,
            BirthDay: birthDay,
            City: city,
            Interests: interests,
            AboutUser: aboutUser,
            Gender: gender,
        });
        const requestUrl = `${PROFILES_API_URL}/${userId}`;
        return FetchWrap.Put(requestUrl, request, async (response) => {
            return new ApiResult({status: response.status});
        });
    }

    /**
     * Find new candidates
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static FindCandidate = async () => {
        const requestUrl = `${PROFILES_API_URL}/${PROFILE_CANDIDATE_POSTFIX_API_URL}`;
        return FetchWrap.Post(requestUrl, '');
    }

    /**
     * Set action(like or dislike)
     * @param {number}id
     * @param {number}action
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static SetLikeDislike = async ({id, action}) => {
        const request = JSON.stringify({
            Id: id,
            Action: action,
        });
        return FetchWrap.Post(LIKES_API_URL, request, async (response) => {
            return new ApiResult({status: response.status});
        });
    }

    /**
     * Get matched likes
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetAllLikes = async () => {
        return FetchWrap.Get(LIKES_API_URL);
    }
}
