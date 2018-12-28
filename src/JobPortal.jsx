import 'babel-polyfill';
import { browserHistory, Route, Router } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import { render } from 'react-dom';
import AddEditJob from './js/components/AddEditJob.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import JobList from './js/components/JobList.jsx';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';

export default class JobPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nightMode: false,
            targettedJob: null,
        };
        this.createTheme = this.createTheme.bind(this);
        this.getTargetJob = this.getTargetJob.bind(this);
        this.routes = (
            <div>
                <Route
                    path="/"
                    component={() => <JobList editTargetJob={this.getTargetJob} />}
                />
                <Route
                    path="/jobList"
                    component={() => <JobList editTargetJob={this.getTargetJob} />}
                />
                <Route
                    path="/addJob"
                    component={() => <AddEditJob />}
                />
                <Route
                    path="/editJob"
                    component={() => <AddEditJob targettedJob={this.state.targettedJob} />}
                />
            </div>
        );
    }

    getTargetJob(job) {
        this.setState({ targettedJob: job }, () => {
            browserHistory.push('/editJob');
        });
    }

    createTheme() {
        const { nightMode } = this.state;
        return createMuiTheme({
            palette: {
                type: nightMode ? 'dark' : 'light',
            },
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={this.createTheme()}>
                <CssBaseline>
                    <Router history={browserHistory}>
                        {this.routes}
                    </Router>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

render(<JobPortal />, document.getElementById('app'));
//
// <Route path="/" component={JobList} />
// <Route path="/jobList" component={JobList} />
// <Route path="/addJob" component={AddJob} />
