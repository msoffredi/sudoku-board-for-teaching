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
    renderIconStatus(): JSX.Element {
        if (this.props.iconStatus) {
            return <p>{this.props.iconStatus}</p>;
        }

        return <></>;
    }

    render(): JSX.Element {
        return (
            <div id={this.props.id} className="toolbar-button" onClick={() => this.props.onClick()}>
                <i className={this.props.fontAwesomeClass}>{this.renderIconStatus()}</i>
                <p>{this.props.text}</p>
            </div>
        );
    }
}
