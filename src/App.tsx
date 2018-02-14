import * as React from 'react';
import './App.css';
// import {Route, Router, Switch} from 'react-router';
import Login from './Login';
import { DropDownHolder } from './common/DropdownHolder';
import * as NotificationSystem from 'react-notification-system';

class App extends React.Component {
    render() {
        return (
            <div>
                <Login/>
                <NotificationSystem ref={(ref: any) => DropDownHolder.setDropDown(ref)}/>
            </div>
        );
    }
}

export default App;
