// import {UserId} from "./apiModels.js";

const Port = '8080';
const IP = 'http://127.0.0.1:';
const ApiPrefix = '';
const UsersApiUrl = 'users';
const ProfilesApiUrl = 'profiles';
const LikesApiUrl = 'likes';
const ProfileApiShortPostfixUrl = 'shorts';
const ProfileApiCandidatesPostfixUrl = 'candidates';

const InternalError = 500;

/**
 * Present result of api call
 */
export class ApiResult {
    Status;
    ErrorMsg;
    Body;

    /**
     * Create result of api
     * @param {number}status
     * @param {string}errorMsg
     * @param {Object}body
     */
    constructor({status, errorMsg = undefined, body = undefined}) {
        this.Status = status;
        this.ErrorMsg = errorMsg;
        this.Body = body;
    }

    /**
     * Check if 2xx fetch return
     * @return {boolean}
     */
    isOk() {
        return this.Status / 100 === 2;
    }

    /**
     * Check if 401 fetch return
     * @return {boolean}
     */
    isAuthRequired() {
        return this.Status === 401;
    }

    /**
     * Check if 500 fetch return
     * @return {boolean}
     */
    isInternalErr() {
        return this.Status === InternalError;
    }
}

/**
 * Api class(fetch wrapped)
 */
export class Api {
    /**
     * Wrap fetch get
     * @param {string}url
     * @return {Promise<Response>}
     */
    static get = (url) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'GET', credentials: 'include',
        });
    }
    /**
     * Wrap fetch put
     * @param {string}url
     * @param {string}body
     * @return {Promise<Response>}
     */
    static put = (url, body) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'PUT',
            credentials: 'include',
            body: body,
        });
    }
    /**
     * Wrap fetch post
     * @param {string}url
     * @param {string}body
     * @return {Promise<Response>}
     */
    static post = (url, body) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'POST',
            credentials: 'include',
            body: body,
        });
    }
    /**
     * Wrap fetch delete
     * @param {string}url
     * @return {Promise<Response>}
     */
    static delete = (url) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

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
            return new ApiResult({status: InternalError, errorMsg: 'not json response'});
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
        let response;
        try {
            response = await this.get(UsersApiUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        return await this.parseAll(response);
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
        let response;
        try {
            response = await this.put(UsersApiUrl, request);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
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
        let response;
        try {
            response = await this.post(UsersApiUrl, request);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
    }

    /**
     * Logout user
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static LogOut = async () => {
        let response;
        try {
            response = await this.delete(UsersApiUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        if (!response.ok) {
            return await this.parseServerError(response);
        }

        return new ApiResult({status: response.status});
    }

    /**
     * Get long profile data
     * @param {number}id
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetLongProfile = async ({id}) => {
        let response;
        const requestUrl = `${ProfilesApiUrl}/${id.toString()}`;
        try {
            response = await this.get(requestUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        return await this.parseAll(response);
    }

    /**
     * Get short profile data
     * @param {number}id
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetShortProfile = async ({id}) => {
        let response;
        const requestUrl = `${ProfilesApiUrl}/${id.toString()}/${ProfileApiShortPostfixUrl}`;
        try {
            response = await this.get(requestUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        return await this.parseAll(response);
    }

    /**
     * Change user profile info
     * @param {number}UserId
     * @param {string}FirstName
     * @param {string}LastName
     * @param {string}BirthDay
     * @param {string}City
     * @param {[string]}Interests
     * @param {string}AboutUser
     * @param {number}Gender
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static ChangeProfile = async ({UserId, FirstName, LastName, BirthDay, City, Interests, AboutUser, Gender}) => {
        const request = JSON.stringify({
            UserId,
            FirstName,
            LastName,
            BirthDay,
            City,
            Interests,
            AboutUser,
            Gender,
        });
        const requestUrl = `${ProfilesApiUrl}/${UserId}`;
        let response;
        try {
            response = await this.put(requestUrl, request);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        if (!response.ok) {
            return await this.parseServerError(response);
        }
        return new ApiResult({status: response.status});
    }

    /**
     * Find new candidates
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static FindCandidate = async () => {
        const requestUrl = `${ProfilesApiUrl}/${ProfileApiCandidatesPostfixUrl}`;
        let response;
        try {
            response = await this.post(requestUrl, {});
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
    }

    /**
     * Set action(like or dislike)
     * @param {number}Id
     * @param {number}Action
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static SetLikeDislike = async ({Id, Action}) => {
        const request = JSON.stringify({Id, Action});
        let response;
        try {
            response = await this.post(LikesApiUrl, request);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        if (!response.ok) {
            return await this.parseServerError(response);
        }
        return new ApiResult({status: response.status});
    }

    /**
     * Get matched likes
     * @return {Promise<ApiResult>}
     * @constructor
     */
    static GetAllLikes = async () => {
        let response;
        try {
            response = await this.get(LikesApiUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
    }
}
