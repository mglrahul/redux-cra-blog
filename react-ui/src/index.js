import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import routes from './routes';
import rootReducer from './reducers/index';
import setAuthorizationsToken from './utils/setAuthorizationsToken';
import { setCurrentUser } from './actions/auth';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
    )
)

if(localStorage.jwtToken){
    setAuthorizationsToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
  document.getElementById('root')
);
