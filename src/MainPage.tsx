import * as React from 'react';
import {LceState} from './lce/LCE';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import {Route, Switch} from 'react-router';
import CardTypes from './CardTypes';
import {Nav, NavIcon, NavText, withRR4} from 'react-sidenav';
import * as FontAwesome from 'react-fontawesome';
import {logOut} from './redux/UserStore';
import * as PropTypes from 'prop-types';
import Dashboard from './Dashboard';

const SideNav = withRR4();

type Props = { user?: LceState<any> };

const BaseContainer = props => (
    <div
        style={{
            display: 'inline-block',
            paddingTop: 16,
            paddingBottom: 16,
            fontFamily: 'Roboto',
            width: '100%',
            ...props.style
        }}
    >
        {props.children}
    </div>);

export default class MainPage extends React.Component<Props, any> {
    static contextTypes = {router: PropTypes.object.isRequired};

    render() {
        return (
            <Container fluid={true}>
                <Row style={{height: '100%'}}>
                    <Col sm={2} xs={12} style={{background: '#2d353c', color: '#FFF'}}>
                        <Col sm={2} xs={12}
                             style={{
                                 position: 'fixed',
                                 top: 0,
                                 left: 0,
                                 bottom: 0,
                                 background: '#2d353c',
                                 paddingLeft: '0px',
                                 paddingRight: '0px'
                             }}>
                            <BaseContainer
                                style={{
                                    fontSize: 13,
                                    background: '#2d353c',
                                    color: '#a8acb1',
                                    paddingTop: 0
                                }}>
                                <div style={{display: 'flex', padding: 16, background: '#1a2229'}}>
                                    <div style={{width: 36, height: 36}}>
                                        <FontAwesome name="user-circle" size="3x"/>
                                    </div>
                                    <div style={{paddingLeft: 10, paddingTop: 4}}>
                                        <div style={{fontSize: 12, color: '#E5E5E5'}}>
                                            &nbsp;{'-'} &nbsp;
                                        </div>
                                        <div style={{fontSize: 11}}> &nbsp;Admin</div>
                                    </div>
                                </div>
                                <SideNav highlightColor="white" highlightBgColor="#149E9C"
                                         defaultSelected="dashboard/workers">
                                    <Nav id="dashboard">
                                        <NavIcon>&nbsp;<FontAwesome name="male"/></NavIcon>
                                        <NavText>Főoldal</NavText>
                                    </Nav>
                                    <Nav id="cardTypes">
                                        <NavIcon><FontAwesome name="industry"/></NavIcon>
                                        <NavText>Kártyatípusok</NavText>
                                    </Nav>
                                    <div onClick={this.onLogout}>
                                        <Nav id="logout">
                                            <NavIcon><FontAwesome name="sign-out"/></NavIcon>
                                            <NavText>Kilépés</NavText>
                                        </Nav>
                                    </div>
                                </SideNav>
                            </BaseContainer>
                        </Col>
                    </Col>

                    <Col sm={10} xs={12}>
                        <Container fluid={true}>
                            <Switch>
                                <Route exact={true} path="/cardTypes" component={CardTypes}/>
                                <Route path="/dashboard/" component={Dashboard}/>
                            </Switch>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

    onLogout = () => {
        logOut();
        this.context.router.history.push('/');
    }
}

// export default mapPropsStream<any, any>(propStream$ => propStream$)(MainPage);