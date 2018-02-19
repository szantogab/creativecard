import * as React from 'react';
import './App.css';
import {DropDownHolder} from './common/DropdownHolder';
import * as NotificationSystem from 'react-notification-system';
import Routes from './Routes';

class App extends React.Component {
    render() {
        return (
            <div>
                {Routes}
                <NotificationSystem ref={(ref: any) => DropDownHolder.setDropDown(ref)}/>
            </div>
        );
    }
}

export default App;
