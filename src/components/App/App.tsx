import React from 'react';
import './App.scss';
import { Game, Overlay } from '../.';
import { GameDataType, GameStatusType } from '../../types';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { setGameStatus } from '../../actions';

const easy1 = [
    [null, null, null, null, 9, null, 8, 7, 2],
    [7, null, 2, null, 8, 1, 4, 5, null],
    [9, null, null, 2, null, null, null, 1, 3],
    [1, null, null, 9, null, null, null, 4, null],
    [null, 7, null, 1, null, 5, null, null, null],
    [4, 2, null, null, null, 8, 5, 6, null],
    [null, 3, 5, null, 8, null, null, null, null],
    [8, null, 4, null, 3, 6, 5, null, null],
    [null, 9, 6, 7, null, null, null, 3, 2],
];

const solutionEasy1 = [
    [5, 1, 3, 6, 9, 4, 8, 7, 2],
    [7, 6, 2, 3, 8, 1, 4, 5, 9],
    [9, 8, 4, 2, 5, 7, 6, 1, 3],
    [1, 5, 8, 9, 2, 6, 3, 4, 7],
    [6, 7, 3, 1, 4, 5, 2, 9, 8],
    [4, 2, 9, 3, 7, 8, 5, 6, 1],
    [7, 3, 5, 2, 8, 1, 4, 6, 9],
    [8, 2, 4, 9, 3, 6, 5, 1, 7],
    [1, 9, 6, 7, 4, 5, 8, 3, 2]
];

const game = {
    start: easy1,
    solution: solutionEasy1
} as GameDataType;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps extends AppStateToProps {
    setGameStatus: typeof setGameStatus;
}

class AppComponent extends React.Component<AppProps> {
    unpauseGame = (): void => {
        let newStatus = this.props.gameStatus;

        if (newStatus === GameStatusType.Paused) {
            newStatus = GameStatusType.On;
        }

        if (newStatus !== this.props.gameStatus) {
            this.props.setGameStatus(newStatus);
        }
    };

    renderPauseOverlay(): JSX.Element {
        if (this.props.gameStatus === GameStatusType.Paused) {
            return (
                <Overlay
                    text="Click anywhere to get back to the game"
                    onClick={this.unpauseGame}
                />
            );
        }

        return <></>;
    }

    renderLostOverlay(): JSX.Element {
        if (this.props.gameStatus === GameStatusType.Lost) {
            return (
                <Overlay
                    text="You Lost! But don't worry, click anywhere for another chance"
                    onClick={() => window.location.reload()}
                />
            );
        }

        return <></>;
    }

    render(): JSX.Element {
        return (
            <main className="container-center">
                {this.renderPauseOverlay()}
                {this.renderLostOverlay()}
                <div >
                    <h1 id="title">Sudoku board for teaching</h1>
                    <Game game={game} />
                </div>
            </main>
        );
    }
}

interface AppStateToProps {
    gameStatus: GameStatusType;
}

const mapStateToProps = (store: StoreState,): AppStateToProps => {
    return {
        gameStatus: store.game.status
    };
};

export const App = connect(
    mapStateToProps,
    { setGameStatus }
)(AppComponent);
