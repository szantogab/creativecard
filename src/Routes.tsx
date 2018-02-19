import * as React from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router';
import Login from './Login';
import MainPage from './MainPage';
import appState from './redux';

export default (
    <Switch>
        <Route path="/" exact={true} component={Login}/>
        <Route component={MainPage}/>
        <Route render={() => (
            appState.getValue().login.token === null ? (<Redirect to="/"/>) : <MainPage/>
        )}/>
    </Switch>
);