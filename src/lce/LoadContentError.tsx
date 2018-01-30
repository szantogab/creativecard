/**
 * A Load-Content-Error component that is able to display a loader, content or error.
 * It is also able to show an info message when a list is empty.
 *
 * Usually it is fed through the lce prop.
 *
 * Created by gabor on 2017. 10. 03..
 */
import * as React from 'react';
import Loader from 'react-loaders';
import * as FontAwesome from 'react-fontawesome';
import {getErrorMessage, handleError} from '../common/ErrorHandler';
import {Row} from 'reactstrap';
import {LceState} from './LCE';

type Props = {
    style?: any, // optional React styling
    loading?: boolean, // whether to show loading or not. Only used if lce is not provided.
    error?: any | boolean, // whether to show an error or not. Only used if lce is not provided.
    isEmpty?: boolean, // whether to show the emptyText prop, or not.
    emptyText?: string, // the text shown when the content is empty.
    lce?: LceState<any>, // the primary source
    onlyShowContentWhenNotNull?: boolean,
    showErrorInDropdown?: boolean // whether to show the error in a dropdown instead of full screen. Best used with login-type screens.
};

export default class LoadContentError extends React.Component<Props, {}> {
    render() {
        if (this.getLoading()) {
            return this.renderContainer(
                <Row style={{textAlign: 'center'}}>
                    <Loader type="pacman" active={true} innerClassName="inline_loader_icon"/>
                    <span>Betöltés...</span>
                </Row>);
        }

        if (this.getError(this.props) && !this.props.showErrorInDropdown) {
            return this.renderContainer(
                <Row style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                    <FontAwesome name="exclamation-triangle" size="3x"/>
                    <span style={{marginTop: '5px'}}>{getErrorMessage(this.getError(this.props))}</span>
                </Row>);
        }

        if (this.isEmptyContent()) {
            return this.renderContainer(
                <Row style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                    <FontAwesome name="frown-o" size="3x"/>
                    <span style={{marginTop: '5px'}}>{this.getEmptyText()}</span>
                </Row>);
        }

        return this.props.children;
    }

    renderContainer = (children) => {
        return (
            <Row style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center', ...this.props.style
            }}>
                {children}
            </Row>);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.showErrorInDropdown && !this.getError(this.props) && this.getError(nextProps)) {
            handleError(this.getError(nextProps));
        }
    }

    getLoading = () => (typeof(this.props.loading) !== 'undefined' ? this.props.loading : this.props.lce!.isLoading());
    getError = (props: Props) => (typeof(props.error) !== 'undefined' ? props.error : props.lce!.error);
    isEmptyContent = () => (typeof(this.props.isEmpty) !== 'undefined' ? this.props.isEmpty : (Array.isArray(this.props.lce!.content) ? this.props.lce!.content.length === 0 : (this.props.onlyShowContentWhenNotNull && !this.props.lce!.content)));
    getEmptyText = () => this.props.emptyText ? this.props.emptyText : 'Nincs megjelenítendő elem!';
}
