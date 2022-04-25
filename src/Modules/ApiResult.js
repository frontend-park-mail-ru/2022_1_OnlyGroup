export const INTERNAL_ERROR = 500;
export const AUTH_REQUIRED = 401;

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
        return this.Status === AUTH_REQUIRED;
    }

    /**
     * Check if 500 fetch return
     * @return {boolean}
     */
    isInternalErr() {
        return this.Status === INTERNAL_ERROR;
    }
}
