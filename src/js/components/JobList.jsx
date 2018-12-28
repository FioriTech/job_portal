import { browserHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import httpHelper from '../helpers/httpHelper';
import JobListStyle from '../../assets/style/jobListStyle';
import Message from '../common/Message.jsx';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-spinkit';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class JobList extends React.Component {
    constructor(props) {
        super(props);

        this.compileData = this.compileData.bind(this);
        this.submitSuccess = this.submitSuccess.bind(this);
        this.requestFailure = this.requestFailure.bind(this);
        this.editJobPosting = this.editJobPosting.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.deleteSuccess = this.deleteSuccess.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.initializeData = this.initializeData.bind(this);

        this.jobData = null;
        this.state = {
            loading: true,
            tableHeader: [],
            jobView: [],
            errorMessage: '',
            successMessage: '',
        };
    }

    componentDidMount() {
        this.initializeData();
    }

    initializeData() {
        const getAllJobsHTTPObj = {
            method: 'GET',
            url: '/api/getAllJobs',
        };

        httpHelper(getAllJobsHTTPObj, this.submitSuccess, this.requestFailure);
    }

    submitSuccess(resp) {
        if (resp.status === 200) {
            this.setState({
                loading: false,
                errorMessage: '',
                successMessage: '',
            });
            this.compileData(resp.data);
        } else {
            this.requestFailure(resp);
        }
    }

    requestFailure(error) {
        this.setState({ loading: false, errorMessage: error.message });
    }

    editJobPosting({ currentTarget }) {
        const jobId = currentTarget.attributes.name.value;
        const targetedJob = this.jobData.filter(x => x.id.toString() === jobId)[0];
        this.props.editTargetJob(targetedJob);
    }

    deleteJob({ currentTarget }) {
        const result = confirm('Are you sure you want to delete the job application?');

        if (result) {
            const jobId = currentTarget.attributes.name.value;
            const deleteJobHTTPObj = {
                data: { id: jobId },
                url: '/api/deleteJob',
            };

            httpHelper(deleteJobHTTPObj, this.deleteSuccess, this.requestFailure);
            this.setState({ loading: true, errorMessage: '' });
        }
    }

    deleteSuccess(resp) {
        if (resp.status === 200) {
            this.setState({
                loading: false,
                errorMessage: '',
                successMessage: 'Job is deleted suceessfully.',
            });
            this.initializeData();
        } else {
            this.requestFailure(resp);
        }
    }

    compileData(data) {
        const viewResult = [];
        let tableHeader = [];
        const { classes } = this.props;
        let index = 0;
        let className = '';

        for (const job of data) {
            index++;

            if (index % 2 !== 0) {
                className = 'row';
            } else {
                className = 'row_stripped';
            }

            const jobRowItem = (
                <Grid container key={job.id} onClick={this.showJob} className={classes[className]}>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            {job.job_type}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            {job.location}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            {job.job_code}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            {job.experience}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            {job.openings}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} onClick={this.editJobPosting} name={job.id} >
                        <Typography variant="subtitle1" color="inherit" align="center">
                            <EditIcon color="primary" className={classes.icons} />
                        </Typography>
                    </Grid>
                    <Grid item xs={1} onClick={this.deleteJob} name={job.id}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            <DeleteForeverIcon color="error" className={classes.icons} />
                        </Typography>
                    </Grid>
                </Grid>
            );

            viewResult.push(jobRowItem);
        }

        if (viewResult.length > 0) {
            tableHeader = (
                <Grid container className={classes.headerClass}>
                    <Grid item xs={3}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            JOB TYPE
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            JOB LOCATION
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            JOB CODE
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            EXPERIENCE
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            OPENINGS
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            EDIT
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                            align="center"
                            classes={{ subtitle1: classes.headingClass }}
                        >
                            DELETE
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        this.setState({
            tableHeader,
            jobView: viewResult,
            loading: false,
        });
        this.jobData = data;
    }

    handleCloseMessage() {
        this.setState({
            loading: false,
            errorMessage: '',
            successMessage: '',
        });
    }

    render() {
        let loadingState = null;
        let error = null;

        const { classes } = this.props;
        const { errorMessage, successMessage } = this.state;

        if (errorMessage || successMessage) {
            let message = successMessage;
            let color = '#43a047';

            if (errorMessage) {
                message = errorMessage;
                color = '#d32f2f';
            }

            error = (
                <Message
                    message={message}
                    handleClose={this.handleCloseMessage}
                    color={color}
                />
            );
        }

        if (this.state.loading) {
            loadingState = (
                <div className={classes.overlay}>
                    <Spinner
                        className={classes.spinner}
                        name="chasing-dots"
                        fadeIn="none"
                        color="black"
                    />
                </div>
            );
        }

        return (
            <div>
                {loadingState}
                <AppBar position="static">
                    <Toolbar>
                        <Grid container direction="row" justify="flex-start">
                            <Grid item xs={8} sm={4} md={4} lg={3} xl={3}>
                                <Typography variant="h6" color="inherit">
                                    Job List
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={8} md={8} lg={9} xl={9}>
                                <Fab
                                    color="primary"
                                    aria-label="Add"
                                    className={classes.add_btn}
                                    onClick={() => { browserHistory.push('/addJob'); }}
                                >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    className={classes.root}
                    alignItems="center"
                    direction="column"
                    justify="center"
                >
                    <Grid item xs={12} md={10} lg={11} xl={11} className={classes.paper_form}>
                        <Paper className={classes.paper_box} elevation={1}>
                            {this.state.tableHeader}
                            {this.state.jobView}
                        </Paper>
                    </Grid>
                </Grid>
                {error}
            </div>
        );
    }
}

JobList.propTypes = {
    classes: PropTypes.object.isRequired,
    editTargetJob: PropTypes.func,
};

JobList.defaultProps = {};

export default withStyles(JobListStyle)(JobList);
