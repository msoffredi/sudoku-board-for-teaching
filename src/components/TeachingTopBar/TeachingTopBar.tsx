import React from 'react';
import './TeachingTopBar.scss';

export class TeachingTopBar extends React.Component {
    renderArrows(): JSX.Element[] {
        const arrows: JSX.Element[] = [];

        for (let i = 1; i < 10; i++) {
            arrows.push(<div key={`top-arrow${i}`}>
                <i className="fas fa-caret-down"></i>
            </div>);
        }

        return arrows;
    }

    render(): JSX.Element {
        return (
            <div className="teaching-arrows">
                {this.renderArrows()}
            </div>
        );
    }
}