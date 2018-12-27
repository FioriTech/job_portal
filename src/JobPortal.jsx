import 'babel-polyfill';
import { browserHistory, Route, Router } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import { render } from 'react-dom';
import AddJob from './js/components/AddJob.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import JobList from './js/components/JobList.jsx';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';

export default class JobPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nightMode: false,
        };
        this.createTheme = this.createTheme.bind(this);
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
                        <Route path="/" component={JobList} />
                        <Route path="/jobList" component={JobList} />
                        <Route path="/addJob" component={AddJob} />
                    </Router>
                </CssBaseline>
            </MuiThemeProvider>
        );
    }
}

render(<JobPortal />, document.getElementById('app'));
