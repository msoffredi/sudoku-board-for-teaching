import React from "react";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";
import './Toolbar.scss';

interface ToolbarProps {
    onEraseClick: () => void;
}

export class Toolbar extends React.Component<ToolbarProps> {
    render(): JSX.Element {
        return (
            <div id="toolbar">
                <ToolbarButton
                    id="eraser-button"
                    onClick={() => this.props.onEraseClick()}
                    fontAwesomeClass="fas fa-eraser"
                    text="Erase"
                />
                <ToolbarButton
                    id="pause-button"
                    onClick={() => { return; }}
                    fontAwesomeClass="far fa-pause-circle"
                    text="Pause"
                />
                <ToolbarButton
                    id="annotations"
                    onClick={() => { return; }}
                    fontAwesomeClass="fas fa-pencil-alt"
                    text="Notes"
                    iconStatus="off"
                />
            </div>
        );
    }
}
