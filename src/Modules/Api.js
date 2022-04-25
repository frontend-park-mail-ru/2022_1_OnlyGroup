import {ApiResult, INTERNAL_ERROR} from './ApiResult';
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
     * Parse 5xx
     * @param {Promise<Response>}response
     * @return {Promise<ApiResult>}
     */
    static parseServerError = async (response) => {
        let parsedError;
        try {
            parsedError = await response.json();
        } catch {
            return new ApiResult({status: response.status, errorMsg: 'not json response'});
        }

        return new ApiResult({status: response.status, errorMsg: parsedError.Msg});
    }

    /**
     * Parse server response
     * @param {Promise<Response>}response
     * @return {Promise<ApiResult>}
     */
    static parseServerResponse = async (response) => {
        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            return new ApiResult({status: INTERNAL_ERROR, errorMsg: 'not json response'});
        }
        return new ApiResult({status: response.status, body: parsedData});
    }

    /**
     * Parse server response and error
     * @param {Promise<Response>}response
     * @return {Promise<ApiResult>}
     */
    static parseAll = async (response) => {
        if (!response.ok) {
            return await this.parseServerError(response);
        }

        return await this.parseServerResponse(response);
    }

    /**
     * Check if user loggined
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static CheckLogin = async () => {
        return FetchWrap.get(USERS_API_URL, async (response) =>{
            return await this.parseAll(response);
        });
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
        return FetchWrap.put(USERS_API_URL, request, async (response) =>{
            return await this.parseAll(response);
        });
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
        return FetchWrap.post(USERS_API_URL, request, async () => {
            return await this.parseAll(response);
        });
    }

    /**
     * Logout user
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static LogOut = async () => {
        return FetchWrap.delete(USERS_API_URL, async (response) =>{
            if (!response.ok) {
                return await this.parseServerError(response);
            }

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
        let response;
        const requestUrl = `${PROFILES_API_URL}/${id.toString()}`;
        return FetchWrap.get(requestUrl, async (response) => {
            return await this.parseAll(response);
        });
    }

    /**
     * Get short profile data
     * @param {number}id
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetShortProfile = async ({id}) => {
        let response;
        const requestUrl = `${PROFILES_API_URL}/${id.toString()}/${PROFILE_SHORT_POSTFIX_API_URL}`;
        return FetchWrap.get(requestUrl, async (response) => {
            return await this.parseAll(response);
        });
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
        return FetchWrap.put(requestUrl, request, async (response) => {
            if (!response.ok) {
                return await this.parseServerError(response);
            }
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
        return FetchWrap.post(requestUrl, '', async (response) => {
            return await this.parseAll(response);
        });
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
        return FetchWrap.post(LIKES_API_URL, request, async (response) => {
            if (!response.ok) {
                return await this.parseServerError(response);
            }
            return new ApiResult({status: response.status});
        });
    }

    /**
     * Get matched likes
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetAllLikes = async () => {
        return FetchWrap.get(LIKES_API_URL, async (response) => {
            return await this.parseAll(response);
        });
    }
}
