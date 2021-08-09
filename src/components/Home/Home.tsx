import React from "react";
import { connect } from "react-redux";
import { setPage } from "../../actions";
import { StoreState } from "../../reducers";
import { Pages } from "../../types";
import './Home.scss';

interface HomeProps extends HomeStateToProps {
    setPage: typeof setPage;
}

class HomeComponent extends React.Component<HomeProps> {
    onNewGameClick = () => {
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
}

const mapStateToProps = (store: StoreState): HomeStateToProps => {
    return {
        navigation: store.navigation
    };
};

export const Home = connect(
    mapStateToProps,
    { setPage }
)(HomeComponent);
