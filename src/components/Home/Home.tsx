import React from "react";
import { connect } from "react-redux";
import { setPage, loadGames } from "../../actions";
import { StoreState } from "../../reducers";
import { GameRow, Pages } from "../../types";
import './Home.scss';

interface HomeProps extends HomeStateToProps {
    setPage: typeof setPage;
    loadGames: () => void;
}

class HomeComponent extends React.Component<HomeProps> {
    loadGames(): void {
        if (!this.props.games.length) {
            this.props.loadGames();
        }
    }

    onNewGameClick = () => {
        this.loadGames();
        // We could set page to error if no puzzles are loaded
        this.props.setPage(Pages.Game);
    };

    render(): JSX.Element {
        return (
            <div>
                <div className="button" onClick={this.onNewGameClick}>
                    <h3>New Game</h3>
                    <p>Click to play a new sudoku game</p>
                </div>
            </div>
        );
    }
}

interface HomeStateToProps {
    navigation: Pages;
    games: GameRow[];
}

const mapStateToProps = (store: StoreState): HomeStateToProps => {
    return {
        navigation: store.navigation,
        games: store.games
    };
};

export const Home = connect(
    mapStateToProps,
    { setPage, loadGames }
)(HomeComponent);
