import React from "react";
import './Infobar.scss';

export class Infobar extends React.Component {
    render(): JSX.Element {
        return (
            <div id="info">
                <div id="timer"><i className="far fa-clock"></i> 2:35</div>
                <div id="errors">Errors: 2</div>
                <div id="settings"><i className="fas fa-cog"></i></div>
            </div>
        );
    }
}
