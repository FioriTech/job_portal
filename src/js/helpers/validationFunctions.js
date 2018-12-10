import {
    alternativePhoneNumberRegex,
    cityRegex, countryCodesRegex,
    emailRegex, faxNumberRegex,
    numberOnlyRegex,
    otcRegex, passwordRegex,
    phoneNumberRegex, zipCodeRegex,
} from '../static/validationsRegex';
import errorTypes from '../static/errorMessages';

/**
 * Fetches messages on the basis of the code.
 * @param  {Integer} code [Code Number.]
 * @return {Object}       [Error description object.]
 */
function fetchErrorFromCode(code) {
    const error = errorTypes.filter(errorType => errorType.errorCode === code)[0];
    return error;
}

/**
 * To validate the value is empty or not
 * @param  {Object} value  [Error Object]
 * @return {Integer}       [Error/Success Code]
 */
function validateMandatory(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return fetchErrorFromCode(1);
    }
    return null;
}

/**
 * To validate the value is empty or not and send different message code.
 * @param  {Object} value  [Error Object]
 * @return {Integer}       [Error/Success Code]
 */
function validateMandatory2(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return fetchErrorFromCode(10);
    }
    return null;
}

/**
 * To validate Emails.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateEmail(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(2);
    }

    const isValid = emailRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(3);
    }

    return null;
}

/**
 * To validate Password.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validatePassword(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(4);
    }

    return null;
}

/**
 * To validate Password.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validatePasswordPage(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(4);
    }
    const isValid = passwordRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(9);
    }

    return null;
}

/**
 * To validate OTC.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateOTC(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(6);
    }

    const isValid = otcRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(7);
    }

    return null;
}

/**
 * To validate City.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateCity(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(10);
    }

    const isValid = cityRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(13);
    }

    return null;
}

/**
 * To validate Phone Number.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validatePhoneNumber(value, type) {
    let targetRegex = null;

    if (type !== 'noMandatoryCheck') {
        const mandatoryCheck = validateMandatory(value);
        targetRegex = phoneNumberRegex;

        if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
            if (type === 'default') {
                return fetchErrorFromCode(16);
            }
            return fetchErrorFromCode(10);
        }
    } else {
        targetRegex = alternativePhoneNumberRegex;
    }

    const isValid = targetRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(14);
    }
    return null;
}

/**
 * To validate zip code.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateZipCode(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(10);
    }

    const isValid = zipCodeRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(12);
    }

    return null;
}

/**
 * To validate fax number.
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateFaxNumber(value) {
    if (value !== '') {
        const isValid = faxNumberRegex.test(value);

        if (!isValid) {
            return fetchErrorFromCode(11);
        }
    }

    return null;
}

/**
 * Validates the country code.
 * @param  {String} value [Value of the country code.]
 * @return {[Bool]}       [Is Valid or not.]
 */
function validateCountryCodes(value) {
    const mandatoryCheck = validateMandatory(value);

    if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
        return fetchErrorFromCode(10);
    }

    const isValid = countryCodesRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(20);
    }

    return null;
}

/**
 * Validate number only.
 * @param  {String}  value       [Value to be tested.]
 * @param  {Boolean} isMandatory [Need to check mandatory or not.]
 * @return {string/Null}       [Message or nothing.]
 */
function validateNumberOnly(value, isMandatory) {
    if (isMandatory) {
        const mandatoryCheck = validateMandatory(value);

        if (mandatoryCheck && mandatoryCheck.errorCode === 1) {
            return fetchErrorFromCode(10);
        }
    }

    const isValid = numberOnlyRegex.test(value);

    if (!isValid) {
        return fetchErrorFromCode(21);
    }

    return null;
}

/**
 * Common calling Function.
 * @param  {String} type   [To determine the type of Validation]
 * @param  {String} value  [Input String]
 * @return {Integer}       [Error/Success Code]
 */
function validateInput(type, value) {
    switch (type) {
    case 'otc': return validateOTC(value);
    case 'email': return validateEmail(value);
    case 'password': return validatePassword(value);
    case 'passwordPage': return validatePasswordPage(value);
    case 'mandatory': return validateMandatory(value);
    case 'phoneNumber': return validatePhoneNumber(value, 'default');
    case 'phoneNumber2': return validatePhoneNumber(value, 'mandatory');
    case 'alternativeNumber': return validatePhoneNumber(value, 'noMandatoryCheck');
    case 'zipCode': return validateZipCode(value);
    case 'city': return validateCity(value);
    case 'faxNumber': return validateFaxNumber(value);
    case 'countryCodes': return validateCountryCodes(value);
    case 'mandatory2': return validateMandatory2(value);
    case 'numberOnlyManadatory': return validateNumberOnly(value);
    case 'numberOnly': return validateNumberOnly(value, false);
    default: return validateMandatory(value);
    }
}

export {
    validateInput,
    fetchErrorFromCode,
};
