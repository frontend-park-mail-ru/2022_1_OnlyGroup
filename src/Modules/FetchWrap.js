import {ApiResult, INTERNAL_ERROR} from './ApiResult';

const PORT = '8080';
const IP = 'http://127.0.0.1:';
const API_PREFIX = '';
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
     * @param {fetch_ok_callback} callback
     * @return {Promise<ApiResult>}
     */
    static fetchErrorDecorator = async (url, init, callback) => {
        let response;
        try {
            response = await fetch(url, init);
        } catch {
            return new ApiResult({status: INTERNAL_ERROR, errorMsg: 'fetch failed'});
        }
        return callback(response);
    }

    /**
     * Wrap fetch get
     * @param {string} url
     * @param {fetch_ok_callback} callback
     * @return {Promise<Response>}
     */
    static get = (url, callback) => {
        return FetchWrap.fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'GET', credentials: 'include',
        }, callback);
    }
    /**
     * Wrap fetch put
     * @param {string}url
     * @param {string}body
     * @param {fetch_ok_callback} callback
     * @return {Promise<Response>}
     */
    static put = (url, body, callback) => {
        return FetchWrap.fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'PUT',
            credentials: 'include',
            body: body,
        }, callback);
    }
    /**
     * Wrap fetch post
     * @param {string}url
     * @param {string}body
     * @param {fetch_ok_callback} callback
     * @return {Promise<Response>}
     */
    static post = (url, body, callback) => {
        return FetchWrap.fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'POST',
            credentials: 'include',
            body: body,
        }, callback);
    }
    /**
     * Wrap fetch delete
     * @param {string}url
     * @param {fetch_ok_callback} callback
     * @return {Promise<Response>}
     */
    static delete = (url, callback) => {
        return FetchWrap.fetchErrorDecorator(`${IP + PORT}/${API_PREFIX + url}`, {
            method: 'DELETE',
            credentials: 'include',
        }, callback);
    }
}
