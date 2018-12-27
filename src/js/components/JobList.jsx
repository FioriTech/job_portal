import { withStyles } from '@material-ui/core/styles';
import AddJobStyle from '../../assets/style/addJobStyle';
import AppBar from '@material-ui/core/AppBar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import httpHelper from '../helpers/httpHelper';
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

        this.state = {
            jobData: null,
            loading: true,
            tableHeader: [],
            jobView: [],
            errorMessage: '',
        };
    }

    componentDidMount() {
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
            });
            this.compileData(resp.data);
        } else {
            this.requestFailure(resp);
        }
    }

    requestFailure(error) {
        this.setState({ loading: false, errorMessage: error.message });
    }

    compileData(data) {
        const viewResult = [];
        let tableHeader = [];

        for (const job of data) {
            const jobRowItem = (
                <Grid container key={job.id} onClick={this.showJob}>
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
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            <EditIcon />
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" color="inherit" align="center">
                            <DeleteForeverIcon />
                        </Typography>
                    </Grid>
                </Grid>
            );

            viewResult.push(jobRowItem);
        }

        if (viewResult.length > 0) {
            tableHeader = (
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h6" color="inherit" align="center">
                            Job Type
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" color="inherit" align="center">
                            Job Location
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" color="inherit" align="center">
                            Job Code
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" color="inherit" align="center">
                            Experience
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" align="center">
                            Openings
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" align="center">
                            Edit
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6" color="inherit" align="center">
                            Delete
                        </Typography>
                    </Grid>
                </Grid>
            );
        }

        this.setState({
            tableHeader,
            jobView: viewResult,
            jobData: data,
            loading: false
        });
    }

    render() {
        let loadingState = null;
        let error = null;

        const { classes } = this.props;
        const { errorMessage } = this.state;

        if (errorMessage) {
            error = (
                <Message
                    message={errorMessage}
                    handleClose={this.handleCloseMessage}
                    color="#d32f2f"
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
                        <Typography variant="h6" color="inherit">
                            Job List
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
};

JobList.defaultProps = {};

export default withStyles(AddJobStyle)(JobList);
