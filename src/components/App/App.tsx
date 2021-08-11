import React from 'react';
import './App.scss';
import { Game, Overlay } from '../.';
import { GameDataType, GameStatusType, Pages } from '../../types';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { setGameStatus, setPage } from '../../actions';
import { TimerHelper } from '../../utils';
import { Home } from '../Home/Home';
import { TopBar } from '../TopBar/TopBar';
import { Menu } from '../Menu/Menu';
import { About } from '../About/About';

const games = {
    easy1: [
        [null, null, null, null, 9, null, 8, 7, 2],
        [7, null, 2, null, 8, 1, 4, 5, null],
        [9, null, null, 2, null, null, null, 1, 3],
        [1, null, null, 9, null, null, null, 4, null],
        [null, 7, null, 1, null, 5, null, null, null],
        [4, 2, null, null, null, 8, 5, 6, null],
        [null, 3, 5, null, 8, null, null, null, null],
        [8, null, 4, null, 3, 6, 5, null, null],
        [null, 9, 6, 7, null, null, null, 3, 2],
    ],
    almostFinished1: [
        [5, 1, 3, 6, 9, 4, 8, 7, 2],
        [7, 6, 2, 3, 8, 1, 4, 5, 9],
        [null, null, 4, 2, 5, 7, 6, 1, 3],
        [1, 5, 8, 9, 2, 6, 3, 4, 7],
        [6, 7, 3, 1, 4, 5, 2, 9, 8],
        [4, 2, 9, 3, 7, 8, 5, 6, 1],
        [7, 3, 5, 2, 8, 1, 4, 6, 9],
        [8, 2, 4, 9, 3, 6, 5, 1, 7],
        [1, 9, 6, 7, 4, 5, 8, 3, 2]
    ],
};

const solutions = {
    solutionEasy1: [
        [5, 1, 3, 6, 9, 4, 8, 7, 2],
        [7, 6, 2, 3, 8, 1, 4, 5, 9],
        [9, 8, 4, 2, 5, 7, 6, 1, 3],
        [1, 5, 8, 9, 2, 6, 3, 4, 7],
        [6, 7, 3, 1, 4, 5, 2, 9, 8],
        [4, 2, 9, 3, 7, 8, 5, 6, 1],
        [7, 3, 5, 2, 8, 1, 4, 6, 9],
        [8, 2, 4, 9, 3, 6, 5, 1, 7],
        [1, 9, 6, 7, 4, 5, 8, 3, 2]
    ],
};

const game = {
    start: games.easy1,
    solution: solutions.solutionEasy1
} as GameDataType;

interface AppProps extends AppStateToProps {
    setGameStatus: typeof setGameStatus;
    setPage: typeof setPage;
}

interface AppState {
    settings: boolean;
    about: boolean;
}

class AppComponent extends React.Component<AppProps, AppState> {
    state = {
        settings: false,
        about: false
    };

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
                    text="You Lost :(, but don't worry, click anywhere for another chance!"
                    onClick={this.backToHome}
                />
            );
        }

        return <></>;
    }

    backToHome = () => {
        this.props.setPage(Pages.Home);
    };

    renderWinningOverlay(): JSX.Element {
        const { gameStatus, gameErrors, gameTime } = this.props;

        if (gameStatus === GameStatusType.Finished) {
            const time = TimerHelper.formatTimer(gameTime);

            return (
                <Overlay
                    text={`You Won! 
                        You completed the sudoku in with ${gameErrors} errors! 
                        Your total time was: ${time}
                        Click anywhere to start a new game.`}
                    onClick={this.backToHome}
                />
            );
        }

        return <></>;
    }

    onMenuSettingsClick = (): void => {
        this.setState({ settings: true });
    };

    onAboutClick = (): void => {
        this.setState({ about: !this.state.about });
    };

    render(): JSX.Element {
        const emptyFunc = () => null;

        const menuItems = [
            { onClick: emptyFunc, text: 'Home', selected: false },
            { onClick: this.onMenuSettingsClick, text: 'Settings', selected: this.state.settings },
            { onClick: this.onAboutClick, text: 'About', selected: this.state.about }
        ];

        return (
            <div id="app">
                <TopBar>
                    <Menu menuItems={menuItems} />
                </TopBar>
                {this.state.about ? <About closeEvent={this.onAboutClick} /> : null}
                <div className="container-center">
                    {this.props.navigation === Pages.Home
                        ? <Home />
                        : <div>
                            {this.renderPauseOverlay()}
                            {this.renderLostOverlay()}
                            {this.renderWinningOverlay()}
                            <Game game={game} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

interface AppStateToProps {
    gameStatus: GameStatusType;
    gameErrors: number;
    gameTime: Date;
    navigation: Pages;
}

const mapStateToProps = (store: StoreState,): AppStateToProps => {
    const { status, errorCounter, time } = store.game;

    return {
        gameStatus: status,
        gameErrors: errorCounter,
        gameTime: time,
        navigation: store.navigation
    };
};

export const App = connect(
    mapStateToProps,
    { setGameStatus, setPage }
)(AppComponent);
