import React from 'react';
import { connect } from 'react-redux';
import { setTeachingRow } from '../../actions';
import { StoreState } from '../../reducers';
import { SudokuNumbersType, TeachingBarType } from '../../types';
import './TeachingRightBar.scss';

interface TeachingRightBarProps extends TeachingRightBarPropsToState {
    setTeachingRow: typeof setTeachingRow;
}

interface TeachingRightBarState {
    rows: TeachingBarType;
}

class TeachingRightBarComponent extends React.Component<TeachingRightBarProps, TeachingRightBarState> {
    constructor(props: TeachingRightBarProps) {
        super(props);

        this.state = { rows: props.rows };
    }

    onArrowClick = (row: SudokuNumbersType) => {
        const newState = Object.assign(this.state);
        newState[row] = !newState[row];

        this.setState(newState);
        this.props.setTeachingRow(row);
    };

    renderArrows = (): JSX.Element[] => {
        const arrows: JSX.Element[] = [];
        let selected;

        for (const [key, value] of Object.entries(this.state.rows)) {
            selected = value ? 'arrow-selected' : '';
            arrows.push(
                <div key={`right-arrow${key}`}>
                    <i
                        className={`fas fa-caret-left ${selected}`}
                        onClick={() => this.onArrowClick(parseInt(key) as SudokuNumbersType)}
                    ></i>
                </div>
            );
        }

        return arrows;
    };

    render(): JSX.Element {
        return (
            <div className="teaching-arrows teaching-right-bar">
                {this.renderArrows()}
            </div>
        );
    }
}

interface TeachingRightBarPropsToState {
    rows: TeachingBarType;
}

const mapPropsToState = (store: StoreState): TeachingRightBarPropsToState => {
    return {
        rows: store.teaching.rows
    };
};

export const TeachingRightBar = connect(
    mapPropsToState,
    { setTeachingRow }
)(TeachingRightBarComponent);
