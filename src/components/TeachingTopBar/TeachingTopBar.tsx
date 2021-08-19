import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { SudokuNumbersType, TeachingBarType } from '../../types';
import { setTeachingColumn } from '../../actions';
import './TeachingTopBar.scss';

interface TeachingTopBarProps extends TeachingTopBarPropsToState {
    setTeachingColumn: typeof setTeachingColumn;
}

interface TeachingTopBarState {
    columns: TeachingBarType;
}

class TeachingTopBarComponent extends React.Component<TeachingTopBarProps, TeachingTopBarState> {
    constructor(props: TeachingTopBarProps) {
        super(props);

        this.state = { columns: props.columns };
    }

    onArrowClick = (column: SudokuNumbersType) => {
        const newState = Object.assign(this.state);
        newState[column] = !newState[column];

        this.setState(newState);
        this.props.setTeachingColumn(column);
    };

    renderArrows = (): JSX.Element[] => {
        const arrows: JSX.Element[] = [];
        let selected;

        for (const [key, value] of Object.entries(this.state.columns)) {
            selected = value ? 'arrow-selected' : '';
            arrows.push(
                <div key={`top-arrow${key}`}>
                    <i
                        className={`fas fa-caret-down ${selected}`}
                        onClick={() => this.onArrowClick(parseInt(key) as SudokuNumbersType)}
                    ></i>
                </div>
            );
        }

        return arrows;
    };

    render(): JSX.Element {
        return (
            <div className="teaching-arrows teaching-top-bar">
                {this.renderArrows()}
            </div>
        );
    }
}

interface TeachingTopBarPropsToState {
    columns: TeachingBarType;
}

const mapPropsToState = (store: StoreState): TeachingTopBarPropsToState => {
    return {
        columns: store.teaching.columns
    };
};

export const TeachingTopBar = connect(
    mapPropsToState,
    { setTeachingColumn }
)(TeachingTopBarComponent);
