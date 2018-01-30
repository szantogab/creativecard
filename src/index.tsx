import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {setObservableConfig} from 'recompose';
import rxjs4config from 'recompose/rxjs4ObservableConfig';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

setObservableConfig(rxjs4config);

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
