const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneNumberRegex = /^[0-9-].{7,}.*$/;

const alternativePhoneNumberRegex = /^[0-9-]*$/;

const cityRegex = /^[a-zA-Z ]*$/;

const zipCodeRegex = /^[0-9]*$/;

const otcRegex = /^[a-z0-9]+$/i;

const faxNumberRegex = /^[0-9-]*$/;

const countryCodesRegex = /^[0-9+-]*$/;

const numberOnlyRegex = /^\d+$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;

export {
    cityRegex,
    zipCodeRegex,
    emailRegex,
    mobileRegex,
    otcRegex,
    numberOnlyRegex,
    phoneNumberRegex,
    alternativePhoneNumberRegex,
    passwordRegex,
    faxNumberRegex,
    countryCodesRegex,
};
