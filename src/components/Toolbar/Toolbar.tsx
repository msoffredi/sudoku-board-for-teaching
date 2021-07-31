import React from "react";
import './Toolbar.scss';

export class Toolbar extends React.Component {
    render(): JSX.Element {
        return (
            <div id="toolbar">
                <div id="eraser-button"><i className="fas fa-eraser"></i><p>Erase</p></div>
                <div id="pause-button"><i className="far fa-pause-circle"></i><p>Pause</p></div>
                <div id="annotations"><i className="fas fa-pencil-alt"><p>Off</p></i><p>Notes</p></div>
            </div>
        );
    }
}
