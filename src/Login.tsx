import * as React from 'react';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import { login } from './redux/UserStore';
import { LceState } from './lce/LCE';
import LoadContentError from './lce/LoadContentError';
import { mapPropsStream } from 'recompose';
import appState$, {AppState} from './redux';

import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';

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
 /*           <Container>
                <Row>
                    <LoadContentError lce={this.props.user} showErrorInDropdown={true}>
                        <Input type="text" value={this.state.userName} onChange={e => this.changeState('userName', e.target.value)}/>
                        <Input type="password" value={this.state.password} onChange={e => this.changeState('password', e.target.value)}/>
                        <Button onClick={() => login({userName: this.state.userName, password: this.state.password})} disabled={this.loginButtonDisabled()}>Bejelentkezés</Button>
                    </LoadContentError>
                </Row>
            </Container>   */
        <Container>
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                  <LoadContentError lce={this.props.user} showErrorInDropdown={true}>
                      <Card className="mt-xl-5">
                          <CardHeader className="card card-info mb-3 text-center">Belépés</CardHeader>
                          <CardBody>
                              <Form onSubmit={e => false}>
                                  <FormGroup>
                                    <Label for="email" className="mr-sm-2">Email</Label>
                                    <Input type="email" id="email" value={this.state.userName} onChange={e => this.changeState('userName', e.target.value)}/>
                                  </FormGroup>
                                  <FormGroup>
                                      <Label for="password" className="mr-sm-2">Jelszó</Label>
                                      <Input type="password" id="password" value={this.state.password} onChange={e => this.changeState('password', e.target.value)}/>
                                  </FormGroup>
                                  <Button color="primary" onClick={() => login({email: this.state.userName, password: this.state.password})} disabled={this.loginButtonDisabled()}>Bejelentkezés</Button>
                              </Form>
                          </CardBody>
                      </Card>
                  </LoadContentError>
                </Col>
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