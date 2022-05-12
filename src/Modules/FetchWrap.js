import {ApiResult, INTERNAL_ERROR} from './ApiResult';

export const PORT = '';
// const IP = 'http://127.0.0.1:';
export const IP = 'http://onlysocial.ddns.net';
export const API_PREFIX = 'api/';
// export const PORT = '8080';
// export const IP = 'http://127.0.0.1:';
// export const API_PREFIX = '';

/**
 * Fetch wrap for get put post delete
 */
export class FetchWrap {
    /**
     * Callback for fetch ok
     * @callback fetch_ok_callback
     * @param {Promise<Response>} response
     * @return {Promise<ApiResult>}
     */
    /**
     * Decorator for fetch error
     * @param {string} url
     * @param {RequestInit} init
     * @param {fetch_ok_callback|undefined} callback
     * @return {Promise<ApiResult>}
     */
    static #fetchErrorDecorator = async (url, init, callback) => {
        let response;
        try {
            response = await fetch(url, init);
        } catch {
            return new ApiResult({status: INTERNAL_ERROR, errorMsg: 'fetch failed'});
        }
        if (!response.ok) {
            return await this.#parseServerError(response);
        }
        if (callback !== undefined) {
            return callback(response);
        }
        return this.#parseServerResponse(response);
    }

    /**
     * Parse server response
     * @param {Response}response
     * @return {Promise<ApiResult>}
     */
    static #parseServerResponse = async (response) => {
        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            return new ApiResult({status: INTERNAL_ERROR, errorMsg: 'not json response'});
        }
        return new ApiResult({status: response.status, body: parsedData});
    }

    /**
     * Parse 5xx
     * @param {Response}response
     * @return {Promise<ApiResult>}
     */
    static #parseServerError = async (response) => {
        let parsedError;
        try {
            parsedError = await response.json();
            return new ApiResult({status: response.status, errorMsg: parsedError.Msg});
        } catch {
            return new ApiResult({status: response.status, errorMsg: 'not json response'});
        }
    }

    /**
     * Wrap fetch get
     * @param {string} url
     * @param {fetch_ok_callback|undefined} callback
     * @return {Promise<Response>}
     */
    static Get = (url, callback= undefined) => {
        return FetchWrap.#fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'GET', credentials: 'include',
        }, callback);
    }
    /**
     * Wrap fetch put
     * @param {string}url
     * @param {string}body
     * @param {fetch_ok_callback|undefined} callback
     * @return {Promise<Response>}
     */
    static Put = (url, body, callback = undefined) => {
        return FetchWrap.#fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'PUT',
            credentials: 'include',
            body: body,
        }, callback);
    }
    /**
     * Wrap fetch post
     * @param {string}url
     * @param {string}body
     * @param {fetch_ok_callback|undefined} callback
     * @return {Promise<Response>}
     */
    static Post = (url, body, callback = undefined) => {
        return FetchWrap.#fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'POST',
            credentials: 'include',
            body: body,
        }, callback);
    }
    /**
     * Wrap fetch delete
     * @param {string}url
     * @param {fetch_ok_callback|undefined} callback
     * @return {Promise<Response>}
     */
    static Delete = (url, callback = undefined) => {
        return FetchWrap.#fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'DELETE',
            credentials: 'include',
        }, callback);
    }
}
