// import {UserId} from "./apiModels.js";

const Port = '8080';
const IP = 'http://127.0.0.1:';
const ApiPrefix = ''
const UsersApiUrl = 'users'
const ProfilesApiUrl = 'profiles'
const LikesApiUrl = 'likes'
const ProfileApiShortPostfixUrl = 'shorts'
const ProfileApiCandidatesPostfixUrl = 'candidates'

const InternalError = 500;

export class ApiResult {
    constructor({status, errorMsg = undefined, body = undefined}) {
        this.Status = status;
        this.ErrorMsg = errorMsg;
        this.Body = body;
    }

    isOk(){
        return this.Status / 100 === 2;
    }

    isAuthRequired(){
        return this.Status === 401;
    }

    isInternalErr() {
        return this.Status === InternalError;
    }

    Status;
    ErrorMsg;
    Body;
}

export class Api {
    static get = (url) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'GET', credentials: 'include',
        });
    }
    static put = (url, body) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'PUT',
            credentials: 'include',
            body: body,
        });
    }
    static post = (url, body) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'POST',
            credentials: 'include',
            body: body,
        });
    }
    static delete = (url) => {
        return fetch(`${IP + Port}/${ApiPrefix + url}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    static parseServerError = async (response) => {
        let parsedError;
        try {
            parsedError = await response.json();
        } catch {
            return new ApiResult({status: response.status, errorMsg: 'not json response'});
        }

        return new ApiResult({status: response.status, errorMsg: parsedError.Msg});
    }

    static parseServerResponse = async (response) => {
        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'not json response'});
        }
        return new ApiResult({status: response.status, body: parsedData});
    }

    static parseAll = async (response) =>{
        if(!response.ok){
            return await this.parseServerError(response);
        }

        return await this.parseServerResponse(response);
    }

    static CheckLogin = async () => {
        let response;
        try {
            response = await this.get(UsersApiUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        return await this.parseAll(response);
    }

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

    static LogOut = async () => {
        let response;
        try {
            response = await this.delete(UsersApiUrl)
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'})
        }
        if (!response.ok){
            return await this.parseServerError(response);
        }

        return new ApiResult({status: response.status})
    }

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

    static GetShortProfile = async ({id}) => {
        let response;
        const requestUrl = `${ProfilesApiUrl}/${id.toString()}/${ProfileApiShortPostfixUrl}`
        try {
            response = await this.get(requestUrl)
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }
        return await this.parseAll(response);
    }

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
        if(!response.ok){
            return await this.parseServerError(response);
        }
        return new ApiResult({status: response.status})
    }

    static FindCandidate = async () => {
        const requestUrl = `${ProfilesApiUrl}/${ProfileApiCandidatesPostfixUrl}`
        let response;
        try {
            response = await this.post(requestUrl, {});
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
    }

    static SetLikeDislike = async ({Id, Action}) =>{
        const request = JSON.stringify({Id, Action});
        let response;
        try {
            response = await this.post(LikesApiUrl, request);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        if(!response.ok){
            return await this.parseServerError(response);
        }
        return new ApiResult({status: response.status})
    }

    static GetAllLikes = async () =>{
        let response;
        try {
            response = await this.get(LikesApiUrl);
        } catch {
            return new ApiResult({status: InternalError, errorMsg: 'fetch failed'});
        }

        return await this.parseAll(response);
    }

    static
}
