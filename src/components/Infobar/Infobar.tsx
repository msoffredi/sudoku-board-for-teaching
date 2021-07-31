import React from "react";
import { connect } from "react-redux";
import { Timer } from "..";
import { StoreState } from "../../reducers";
import './Infobar.scss';

interface InfobarProps {
    errors: number;
}

export class InfobarComponent extends React.Component<InfobarProps> {
    render(): JSX.Element {
        return (
            <div id="info">
                <div id="timer">
                    <i className="far fa-clock"></i>
                    <Timer />
                </div>
                <div id="errors">Errors: {this.props.errors}</div>
                <div id="settings"><i className="fas fa-cog"></i></div>
            </div>
        );
    }
}

interface InfobarStateToProps {
    errors: number;
}

const mapStateToProps = (state: StoreState): InfobarStateToProps => {
    return {
        errors: state.game.errorCounter,
    };
};

export const Infobar = connect(
    mapStateToProps
)(InfobarComponent);
