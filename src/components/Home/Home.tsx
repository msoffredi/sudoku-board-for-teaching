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
    componentDidMount() {
        if (!this.props.games.length) {
            this.props.loadGames();
        }
    }

    onNewGameClick = (event: React.MouseEvent): void => {
        this.homeButtonClick(event, Pages.Game);
    };

    onNewTeachClick = (event: React.MouseEvent): void => {
        this.homeButtonClick(event, Pages.Teach);
    };

    private homeButtonClick(event: React.MouseEvent, page: Pages): void {
        event.preventDefault();

        if (this.props.games.length) {
            this.props.setPage(page);
        }
    }

    render(): JSX.Element {
        const inactive = this.props.games.length ? '' : 'inactive';

        return (
            <div>
                <div className={`button ${inactive}`} onClick={this.onNewGameClick}>
                    <h3>New Game</h3>
                    <p>Click to play a new sudoku game</p>
                </div>
                <div className={`button ${inactive} desktop-only`} onClick={this.onNewTeachClick}>
                    <h3>New Teaching Game</h3>
                    <p>Click to open a new sudoku game for teaching</p>
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
        games: store.games.data
    };
};

export const Home = connect(
    mapStateToProps,
    { setPage, loadGames }
)(HomeComponent);
