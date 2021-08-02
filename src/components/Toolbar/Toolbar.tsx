import React from "react";
import { connect } from "react-redux";
import { ToolbarButton } from "..";
import { StoreState } from "../../reducers";
import { GameModeType } from "../../types";
import { setGameMode } from "../../actions";
import './Toolbar.scss';

interface ToolbarProps extends ToolbarStateToProps {
    onEraseClick: () => void;
    onPauseClick: () => void;
    setGameMode: typeof setGameMode;
}

export class ToolbarComponent extends React.Component<ToolbarProps> {
    onNotesClick = (): void => {
        if (this.props.mode === GameModeType.Edit) {
            this.props.setGameMode(GameModeType.Annotate);
        } else if (this.props.mode === GameModeType.Annotate) {
            this.props.setGameMode(GameModeType.Edit);
        }
    };

    render(): JSX.Element {
        const annotationsColor = this.props.mode === GameModeType.Annotate ? 'on' : 'off';

        return (
            <div id="toolbar">
                <ToolbarButton
                    id="eraser-button"
                    onClick={this.props.onEraseClick}
                    fontAwesomeClass="fas fa-eraser"
                    text="Erase"
                />
                <ToolbarButton
                    id="pause-button"
                    onClick={this.props.onPauseClick}
                    fontAwesomeClass="far fa-pause-circle"
                    text="Pause"
                />
                <ToolbarButton
                    id="annotations"
                    onClick={this.onNotesClick}
                    fontAwesomeClass="fas fa-pencil-alt"
                    text="Notes"
                    color={annotationsColor}
                />
            </div>
        );
    }
}

interface ToolbarStateToProps {
    mode: GameModeType;
}

const mapStateToProps = (store: StoreState): ToolbarStateToProps => {
    return {
        mode: store.game.mode
    };
};

export const Toolbar = connect(
    mapStateToProps,
    { setGameMode }
)(ToolbarComponent);
