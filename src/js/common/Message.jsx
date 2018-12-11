import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseImg from '../../assets/images/Close.png';
import messageStyleHome from '../../assets/style/messageStyleHome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            handleClose, color, classes, message,
        } = this.props;

        let showMessage = false;

        if (message) {
            showMessage = true;
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={showMessage}
                autoHideDuration={8000}
                onClose={handleClose}
            >
                <SnackbarContent
                    style={{ backgroundColor: color }}
                    aria-describedby="client-snackbar"
                    message={
                        <div>
                            <span
                                id="client-snackbar"
                                className={classes.message_span}
                            >
                                {message}
                            </span>
                        </div>
                    }
                    action={[
                        <IconButton
                            key="close"
                            color="inherit"
                            onClick={handleClose}
                            className={classes.message_icon_close}
                        >
                            <img
                                role="presentation"
                                alt="close"
                                src={CloseImg}
                                onClick={this.handleClose}
                            />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string,
    handleClose: PropTypes.func,
    color: PropTypes.string,
};

Message.defaultProps = {};

export default withStyles(messageStyleHome)(Message);
