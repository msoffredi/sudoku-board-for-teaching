import React from 'react';
import './App.scss';
import { Game } from '../.';
import { GameDataType, GameStatusType, Pages } from '../../types';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { setGameStatus, setPage } from '../../actions';
import { Home } from '../Home/Home';
import { TopBar } from '../TopBar/TopBar';
import { Menu } from '../Menu/Menu';
import { About } from '../About/About';
import { Settings } from '../Settings/Settings';

// const games = {
//     easy1: [
//         [null, null, null, null, 9, null, 8, 7, 2],
//         [7, null, 2, null, 8, 1, 4, 5, null],
//         [9, null, null, 2, null, null, null, 1, 3],
//         [1, null, null, 9, null, null, null, 4, null],
//         [null, 7, null, 1, null, 5, null, null, null],
//         [4, 2, null, null, null, 8, 5, 6, null],
//         [null, 3, 5, null, 8, null, null, null, null],
//         [8, null, 4, null, 3, 6, 5, null, null],
//         [null, 9, 6, 7, null, null, null, 3, 2],
//     ],
//     almostFinished1: [
//         [5, 1, 3, 6, 9, 4, 8, 7, 2],
//         [7, 6, 2, 3, 8, 1, 4, 5, 9],
//         [null, null, 4, 2, 5, 7, 6, 1, 3],
//         [1, 5, 8, 9, 2, 6, 3, 4, 7],
//         [6, 7, 3, 1, 4, 5, 2, 9, 8],
//         [4, 2, 9, 3, 7, 8, 5, 6, 1],
//         [7, 3, 5, 2, 8, 1, 4, 6, 9],
//         [8, 2, 4, 9, 3, 6, 5, 1, 7],
//         [1, 9, 6, 7, 4, 5, 8, 3, 2]
//     ],
// };

// const solutions = {
//     solutionEasy1: [
//         [5, 1, 3, 6, 9, 4, 8, 7, 2],
//         [7, 6, 2, 3, 8, 1, 4, 5, 9],
//         [9, 8, 4, 2, 5, 7, 6, 1, 3],
//         [1, 5, 8, 9, 2, 6, 3, 4, 7],
//         [6, 7, 3, 1, 4, 5, 2, 9, 8],
//         [4, 2, 9, 3, 7, 8, 5, 6, 1],
//         [7, 3, 5, 2, 8, 1, 4, 6, 9],
//         [8, 2, 4, 9, 3, 6, 5, 1, 7],
//         [1, 9, 6, 7, 4, 5, 8, 3, 2]
//     ],
// };

// const game = {
//     start: games.easy1,
//     solution: solutions.solutionEasy1
// } as GameDataType;

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

    backToHome = (e?: Event) => {
        if (e) {
            e.preventDefault();
        }

        if (this.props.gameStatus === GameStatusType.On) {
            this.props.setGameStatus(GameStatusType.Off);
        }

        this.props.setPage(Pages.Home);
    };

    onSettingsClick = (): void => {
        this.setState({ settings: !this.state.settings });
    };

    onAboutClick = (): void => {
        this.setState({ about: !this.state.about });
    };

    renderLinkBack = (): JSX.Element => {
        return (
            <a onClick={() => this.backToHome()} href="#">Home &gt;</a>
        );
    };

    render(): JSX.Element {
        const menuItems = [
            { onClick: this.onSettingsClick, text: 'Settings', selected: this.state.settings },
            { onClick: this.onAboutClick, text: 'About', selected: this.state.about }
        ];

        const menu = this.props.gameStatus !== GameStatusType.On
            ? <Menu menuItems={menuItems} />
            : this.renderLinkBack();

        const game = this.props.games[Math.floor(Math.random() * this.props.games.length)];

        return (
            <div id="app">
                <TopBar>{menu}</TopBar>
                {this.state.settings ? <Settings closeEvent={this.onSettingsClick} /> : null}
                {this.state.about ? <About closeEvent={this.onAboutClick} /> : null}
                <div className="container-center">
                    {this.props.navigation === Pages.Home
                        ? <Home />
                        : <div>
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
    games: GameDataType[];
}

const mapStateToProps = (store: StoreState,): AppStateToProps => {
    const { status, errorCounter, time } = store.game;

    return {
        gameStatus: status,
        gameErrors: errorCounter,
        gameTime: time,
        navigation: store.navigation,
        games: store.games
    };
};

export const App = connect(
    mapStateToProps,
    { setGameStatus, setPage }
)(AppComponent);
