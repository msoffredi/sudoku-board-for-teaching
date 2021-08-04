import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import React from 'react';
import { App } from './components';

const store = createStore(
    reducers,
    /* preloadedState, */ composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
