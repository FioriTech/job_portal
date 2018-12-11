import { validateInput } from '../helpers/validationFunctions';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TextBoxStyle from '../../assets/style/textBoxStyle';
import TextField from '@material-ui/core/TextField';

class TextBox extends React.Component {
    constructor(props) {
        super(props);

        this.validateField = this.validateField.bind(this);
        this.resetErrorCode = this.resetErrorCode.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = { error: null };
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.textBox.focus();
        }
    }

    /**
     * On Change event of the textbox.
     * @param  {Object} event [Event object]
     */
    onChange(event) {
        const { value } = event.target;

        if (value.length <= this.props.maxLength) {
            this.props.onChange(event);
        } else {
            event.target.value = value.substr(0, this.props.maxLength - 1);
        }
    }

    /**
     * Validates field on blur.
     */
    validateField() {
        const {
            validationType, value, name, validityName,
        } = this.props;

        if (validationType) {
            const error = validateInput(validationType, value);
            let isValid = true;

            if (error) {
                isValid = false;
            }

            this.setState({ error });
            this.props.setErrorValue(`${name}${validityName}`, isValid);
        }
    }

    /**
     * [Reset Errors]
     */
    resetErrorCode() {
        this.setState({ error: null });
        const { name, validityName } = this.props;

        if (this.props.setErrorValue) {
            this.props.setErrorValue(`${name}${validityName}`, true);
        }
    }

    render() {
        let isError = false;
        let isRequired = false;
        const {
            classes, validationType,
            id, label, name, autoComplete, type,
            multiline, rows, rowsMax, disabled,
            hidden, defaultValue, placeholder,
        } = this.props;

        if (this.state.error) {
            isError = true;
        }

        if (validationType === 'mandatory') {
            isRequired = true;
        }

        return (
            <div>
                <TextField
                    id={id}
                    label={label}
                    margin="normal"
                    onChange={this.onChange}
                    autoComplete={autoComplete}
                    name={name}
                    type={type}
                    onBlur={this.validateField}
                    onFocus={this.resetErrorValue}
                    className={classes.text_field}
                    InputProps={{
                        classes: {
                            underline: classes.css_underline,
                            root: classes.place_holder,
                            input: classes.text_value,
                        },
                    }}
                    InputLabelProps={{
                        className: classes.text_label,
                    }}

                    error={isError}
                    required={isRequired}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    multiline={multiline}
                    rows={rows}
                    rowsMax={rowsMax}
                    hidden={hidden}
                    disabled={disabled}
                />
            </div>
        );
    }
}

TextBox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    validityName: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    validationType: PropTypes.oneOf(['mandatory']),
    maxLength: PropTypes.number,
    autoComplete: PropTypes.oneOf([
        'on', 'off',
    ]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    setErrorValue: PropTypes.func,
    hidden: PropTypes.bool,
    autoFocus: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    classes: PropTypes.object,
};

TextBox.defaultProps = {
    type: 'text',
    validityName: 'IsValid',
    value: '',
    defaultValue: '',
    maxLength: 100,
    validationType: '',
    autoComplete: 'off',
    disabled: false,
    multiline: false,
    hidden: false,
    autoFocus: false,
    rows: 0,
    rowsMax: 4,
};

export default withStyles(TextBoxStyle)(TextBox);
