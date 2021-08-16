import React from 'react';
import './App.scss';
import { Game } from '../.';
import { GameRow, GameStatusType, Pages } from '../../types';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { setGameStatus, setPage } from '../../actions';
import { Home } from '../Home/Home';
import { TopBar } from '../TopBar/TopBar';
import { Menu } from '../Menu/Menu';
import { About } from '../About/About';
import { Settings } from '../Settings/Settings';

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

        return (
            <div id="app">
                <TopBar>{menu}</TopBar>
                {this.state.settings ? <Settings closeEvent={this.onSettingsClick} /> : null}
                {this.state.about ? <About closeEvent={this.onAboutClick} /> : null}
                <div className="container-center">
                    {this.props.navigation === Pages.Home || !this.props.games.length
                        ? <Home />
                        : <div>
                            <Game game={this.props.games[Math.floor(Math.random() * this.props.games.length)]} />
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
    games: GameRow[];
}

const mapStateToProps = (store: StoreState): AppStateToProps => {
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
