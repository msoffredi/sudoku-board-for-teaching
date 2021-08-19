import React from "react";
import './ToolbarButton.scss';

interface ToolbarProps {
    onClick: () => void;
    text: string;
    id: string;
    fontAwesomeClass: string;
    color?: 'off' | 'on' | 'no-pointer';
}

export class ToolbarButton extends React.Component<ToolbarProps> {
    render(): JSX.Element {
        return (
            <div id={this.props.id} className={`toolbar-button ${this.props.color}`} onClick={() => this.props.onClick()}>
                <i className={this.props.fontAwesomeClass}></i>
                <p>{this.props.text}</p>
            </div>
        );
    }
}
