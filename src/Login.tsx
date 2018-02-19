import * as React from 'react';
import {LceState} from './lce/LCE';
import {mapPropsStream} from 'recompose';
import appState$, {AppState} from './redux';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import LoadContentError from './lce/LoadContentError';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Form from 'reactstrap/lib/Form';
import Button from 'reactstrap/lib/Button';
import {login} from './redux/UserStore';
import {withRouter} from 'react-router';

type Props = { user: LceState<any>, history: any };
type State = { userName: string, password: string };

class Login extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            userName: 'test@test.hu',
            password: 'bubububu'
        };
    }

    componentWillReceiveProps( nextProps: Props ) {
        if (!this.props.user.isSuccess() && nextProps.user.isSuccess()) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
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

export default mapPropsStream<any, any>(props$ => appState$.map((state: AppState) => state.login) as any)(withRouter(Login as any));
