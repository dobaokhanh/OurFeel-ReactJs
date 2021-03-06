import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import AuthReducer from './store/reducers/authReducer';
import UserReducer from './store/reducers/userReducer';
import DataReducer from './store/reducers/dataReducer';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    data: DataReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
