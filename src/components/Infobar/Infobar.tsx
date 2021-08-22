import React from "react";
import { connect } from "react-redux";
import { Timer } from "..";
import { StoreState } from "../../reducers";
import './Infobar.scss';

interface InfobarProps extends InfobarStateToProps {
    gameId: string
}

export class InfobarComponent extends React.Component<InfobarProps> {
    renderErrors(): string {
        if (this.props.maxErrors) {
            return this.props.errors.toString() + '/' + this.props.maxErrors;
        }

        return this.props.errors.toString();
    }

    render(): JSX.Element {
        return (
            <div id="info">
                <div>Errors: {this.renderErrors()}</div>
                <div>#{this.props.gameId}</div>
                <div>
                    <i className="far fa-clock"></i>
                    <Timer />
                </div>
            </div>
        );
    }
}

interface InfobarStateToProps {
    errors: number;
    maxErrors: number;
}

const mapStateToProps = (state: StoreState): InfobarStateToProps => {
    return {
        errors: state.game.errorCounter,
        maxErrors: state.settings.maxErrors
    };
};

export const Infobar = connect(
    mapStateToProps
)(InfobarComponent);
