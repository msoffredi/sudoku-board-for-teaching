import React from 'react';
import './TeachingRightBar.scss';

export class TeachingRightBar extends React.Component {
    renderArrows(): JSX.Element[] {
        const arrows: JSX.Element[] = [];

        for (let i = 1; i < 10; i++) {
            arrows.push(<div key={`right-arrow${i}`}>
                <i className="fas fa-caret-left"></i>
            </div>);
        }

        return arrows;
    }

    render(): JSX.Element {
        return (
            <div className="teaching-arrows teaching-right-bar">
                {this.renderArrows()}
            </div>
        );
    }
}
