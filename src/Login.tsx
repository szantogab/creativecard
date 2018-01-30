import * as React from 'react';
import { Container } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import { login } from './redux/UserStore';
import { LceState } from './lce/LCE';
import LoadContentError from './lce/LoadContentError';
import { mapPropsStream } from 'recompose';
import appState$, {AppState} from './redux';

type Props = { user?: LceState<any> };
type State = { userName: string, password: string };

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <LoadContentError lce={this.props.user} showErrorInDropdown={true}>
                        <Input type="text" value={this.state.userName} onChange={e => this.changeState('userName', e.target.value)}/>
                        <Input type="password" value={this.state.password} onChange={e => this.changeState('password', e.target.value)}/>
                        <Button onClick={() => login({userName: this.state.userName, password: this.state.password})} disabled={this.loginButtonDisabled()}>Bejelentkezés</Button>
                    </LoadContentError>
                </Row>
            </Container>
        );
    }

    loginButtonDisabled = () => this.state.userName.length === 0 || this.state.password.length === 0;

    changeState = (param: string, value: string) => {
        let newState = {...this.state};
        newState[param] = value;
        this.setState(newState);
    }
}

export default mapPropsStream<any, any>(props$ => appState$.map((state: AppState) => state.login) as any)(Login);