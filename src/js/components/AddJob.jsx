import { withStyles } from '@material-ui/core/styles';
import AddJobStyle from '../../assets/style/addJobStyle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import httpHelper from '../helpers/httpHelper';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import TextBox from '../common/TextBox.jsx';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

class AddJob extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.submitSuccess = this.submitSuccess.bind(this);
        this.setErrorValue = this.setErrorValue.bind(this);

        this.state = {
            jobType: '',
            location: '',
            jobCode: '',
            experience: '',
            openings: 0,
            requirement: '',
            loading: false,
            isError: false,
            errorMessage: '',
        };
    }

    // UserName and Password onChange event handler.
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * [Set the emailIsValid and passwordIsValid state values.
     * Used to check before login.]
     * @param {[string]} fieldName ['emailIsValid' or 'passwordIsValid']
     * @param {[boolean]} value    [The value of fieldName parameter]
     */
    setErrorValue(fieldName, value) {
        this.setState({ [fieldName]: value });
    }

    // Log In button event handler.
    submit() {
        const {
            jobType, location, jobCode,
            experience, openings, requirement,
        } = this.state;

        const submitJobPostObj = {
            url: 'http://localhost:4000/api/insertNewJobData',
            data: {
                jobType,
                location,
                jobCode,
                experience,
                openings,
                requirement,
            },
        };
        this.setState({ loading: true });

        httpHelper(submitJobPostObj, this.submitSuccess, this.requestFailure);
    }

    // Log In success callback function.
    submitSuccess(resp) {
        if (resp.status.code === 1000) {
            this.setState({
                loading: false,
                isError: false,
                errorMessage: '',
            });
        } else if (resp.status.code === 2000) {
            this.setState({
                loading: false,
                isError: true,
                errorMessage: 'Invalid Credentials',
            });
        }
    }

    // Component Render Function.
    render() {
        let error = null;
        let loadingState = null;

        const { classes } = this.props;

        if (this.state.isError) {
            error = (<center><span className="error">{this.state.errorMessage}</span></center>);
        }

        if (this.state.loading) {
            loadingState = (<div className="overlay" />);
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Add a Job Posting
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    className={classes.root}
                    alignItems="center"
                    direction="column"
                    justify="center"
                >
                    <Grid item xs={12} md={8} lg={6} xl={6} className={classes.paper_form}>
                        <Paper className={classes.paper_box} elevation={1}>
                            <TextBox
                                id="jobType"
                                name="jobType"
                                label="Job Type"
                                onChange={this.onChange}
                                value={this.state.jobType}
                                defaultValue={this.state.jobType}
                                placeholder="Job Type"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                            />
                            <TextBox
                                id="location"
                                name="location"
                                label="Location Type"
                                onChange={this.onChange}
                                value={this.state.location}
                                defaultValue={this.state.location}
                                placeholder="Job Location"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                            />
                            <TextBox
                                id="jobCode"
                                name="jobCode"
                                label="Job Code"
                                onChange={this.onChange}
                                value={this.state.jobCode}
                                defaultValue={this.state.jobCode}
                                placeholder="Job Code"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                            />
                            <TextBox
                                id="openings"
                                name="openings"
                                label="Openings"
                                type="number"
                                onChange={this.onChange}
                                value={this.state.openings}
                                defaultValue={this.state.openings}
                                placeholder="Job Code"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                            />
                            <TextBox
                                id="experience"
                                name="experience"
                                label="Experience"
                                onChange={this.onChange}
                                value={this.state.experience}
                                defaultValue={this.state.experience}
                                placeholder="Experience"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                            />
                            <TextBox
                                id="requirement"
                                name="requirement"
                                label="Requirement"
                                onChange={this.onChange}
                                value={this.state.requirement}
                                defaultValue={this.state.requirement}
                                placeholder="Requirement"
                                validationType="mandatory"
                                maxLength={100}
                                autoComplete="off"
                                disabled={false}
                                setErrorValue={this.setErrorValue}
                                containerClass=""
                                multiline
                                rows={1}
                                rowsMax={4}
                            />
                            <center>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={this.submit}
                                    className={classes.submit_btn}
                                >
                                    Submit
                                </Button>
                            </center>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(AddJobStyle)(AddJob);
