
const textBoxStyle = {
    text_field: {
        color: 'black',
        width: '100%',
        paddingTop: 15,
        paddingLeft: 35,
        paddingRight: 35,
    },

    place_holder: {
        color: 'black',
    },

    text_value: {
        color: 'black',
        fontFamily: 'Montserrat, sans-serif',
    },

    text_label: {
        color: '#999',
        fontFamily: 'Montserrat, sans-serif',
        paddingTop: 15,
        paddingLeft: 35,
        paddingRight: 35,
    },

    css_underline: {
        '&:before': {
            borderBottomColor: '#999',
        },
        '&:after': {
            borderBottomColor: '#999',
        },
        '&:hover:not($enabled):before': {
            borderBottomColor: '#999',
        },
    },
};

export default textBoxStyle;
