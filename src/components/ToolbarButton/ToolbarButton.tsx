import React from "react";
import './ToolbarButton.scss';

interface ToolbarProps {
    onClick: () => void;
    text: string;
    id: string;
    fontAwesomeClass: string;
    iconStatus?: string;
}

export class ToolbarButton extends React.Component<ToolbarProps> {
    render(): JSX.Element {
        const iconStatus = this.props.iconStatus ? <p>{this.props.iconStatus}</p> : null;

        return (
            <div id={this.props.id} className="toolbar-button" onClick={() => this.props.onClick()}>
                <i className={this.props.fontAwesomeClass}>{iconStatus}</i>
                <p>{this.props.text}</p>
            </div>
        );
    }
}
