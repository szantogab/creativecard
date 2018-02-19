import * as React from 'react';
import {LceState} from './lce/LCE';
import {mapPropsStream} from 'recompose';
import appState$, {AppState} from './redux';
import {Link} from 'react-router-dom';
import { Button} from 'reactstrap';
import {logOut} from './redux/UserStore';

type Props = { user?: LceState<any> };
type State = { userName: string, password: string };

export class SideMenu extends React.Component<Props, State> {
    render() {
        return (
            <div style={{backgroundColor: '#ccc'}}>
                <h1>Be vagyunk jelentkezve!</h1>
                <Link to="/dashboard">Főoldal</Link><br/>
                <Link to="/cardTypes">Kártyatípusok</Link><br/>
                <Link to="/"><Button onClick={this.onLogout}>Kilépés</Button></Link>
            </div>
        );
    }

    onLogout = () => {
        logOut();
    }
}

export default mapPropsStream<any, any>(props$ => appState$.map((state: AppState) => state.login) as any)(SideMenu);