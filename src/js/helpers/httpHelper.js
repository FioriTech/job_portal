import axios from 'axios';

/**
 * API calling module
 * @param  {Object} httpObj          [HTTP confirguration object]
 * @param  {Function} successHandler [Success Callback]
 * @param  {Function} errorHandler   [Failure Callback]
 * @return {Objet Callback}          [Return Object Callback]
 */
export default function requestData(httpObj, successHandler, errorHandler, isJSON = true) {
    const serverUrl = window.location.origin;
    const paramsInfo = httpObj.params;
    let httpData = JSON.stringify(httpObj.data);

    if (!isJSON) {
        httpData = httpObj.data;
    }

    return axios.request({
        url: httpObj.url,
        method: httpObj.method || 'post',
        baseURL: httpObj.baseURL || serverUrl,
        headers: {
            ...{
                'Content-Type': 'application/json',
            },
            ...httpObj.headers,
        },
        params: paramsInfo,
        timeout: 40000,
        data: httpData,
    }).then(successHandler, errorHandler);
}
