import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from './App';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';
import { reducers } from '../../reducers';

function createTestStore() {
    return createStore(
        reducers,
        applyMiddleware(thunk)
    );
}

let store: Store;

describe('App tests', () => {
    beforeEach(() => {
        store = createTestStore();
    });

    test('renders learn react link', () => {
        const result = render(<Provider store={store}><App /></Provider>);
        const gameContainerElement = result.container.querySelector('#game-container');
        expect(gameContainerElement).toBeInTheDocument();
    });
});
