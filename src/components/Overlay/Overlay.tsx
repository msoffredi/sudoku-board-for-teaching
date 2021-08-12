import React from "react";
import './Overlay.scss';

interface OverlayProps {
    text: string;
    onClick: (e?: Event) => void;
}

export class Overlay extends React.Component<OverlayProps> {
    render(): JSX.Element {
        return (
            <div className="overlay" onClick={() => this.props.onClick()}>
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}
