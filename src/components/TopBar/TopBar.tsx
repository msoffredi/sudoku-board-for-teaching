import React from "react";
import './TopBar.scss';

interface TopBarProps {
    children?: JSX.Element;
}

export class TopBar extends React.Component<TopBarProps> {
    render(): JSX.Element {
        return (
            <header id="top-bar">
                <div id="logo-container">
                    <div id="icon">S</div>
                    <span>Sudoku BFT</span>
                </div>
                {this.props.children}
            </header>
        );
    }
}
