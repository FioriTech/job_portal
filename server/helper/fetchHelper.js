import fetch from 'node-fetch';

function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    throw new Error(`${response.status} ${response.statusText} - ${response.url}`);
}


function fetchData(requestUrl, requestOptions, processData, errorCallbackObject) {
    return fetch(requestUrl, requestOptions)
        .then(checkStatus)
        .then(data => data.json())
        .then(data => {
            return processData(data);
        })
        .catch((err) => {
            console.log(err);
            errorCallbackObject.status.code = err.message.split(' ')[0];
            errorCallbackObject.status.message = err.message;
            return errorCallbackObject;
        });
}

export {
    fetchData,
};
