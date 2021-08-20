import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { SudokuHelper } from "../../utils";
import './Cell.scss';
import { setSelectedCellCoordinates } from "../../actions";
import {
    AnnotationsType,
    CellCoordinatesType,
    CellValueType,
    GameModeType,
    Pages,
    SelectedCellType,
    SettingsType,
    SudokuNumbersType,
    SudokuSolutionType,
    TeachingState
} from "../../types";

type HighlightClassType = '' | 'same-number' | 'selected' | 'highlighted' | 'teaching';
type ColorClassType = '' | 'wrong' | 'edit';

interface ConditionalContent {
    content?: JSX.Element[] | CellValueType;
    annotationClass: 'annotations' | '';
    colorClass: ColorClassType;
    highlightClass: HighlightClassType;
}

interface CellProps extends CellStateToProps {
    value?: CellValueType;
    annotations?: AnnotationsType | null;
    group: SudokuNumbersType;
    cell: SudokuNumbersType;
    cellOnClick: (coordinates: CellCoordinatesType) => void;
}

interface CellState {
    startingValue: CellValueType;
}

class CellComponent extends React.Component<CellProps, CellState> {
    state = {
        startingValue: this.props.value ? this.props.value : null,
    };

    renderAnnotations(): JSX.Element[] {
        if (this.props.annotations) {
            return this.props.annotations.map((element: CellValueType, index: number) => {
                const cellContent = element === this.props.selectedCell.value
                    ? <b>{element}</b> : element;

                return <div key={index} className="annotation">{cellContent}</div>;
            });
        }

        return [];
    }

    getConditionalContent(): ConditionalContent {
        const { cell, group, selectedCell } = this.props;
        const coordinates = selectedCell.coordinates;
        let highlightClass: HighlightClassType = '';
        let colorClass: ColorClassType = '';
        const [cellCol, cellRow] = SudokuHelper.cellGroupToColRow(cell, group);

        // If this is the selected cell...
        if (cell === coordinates?.cell
            && group === coordinates?.group) {

            highlightClass = 'selected';
        }
        // If this is a cell highlighted by teaching arrows
        else if (this.props.navigation === Pages.Teach
            && this.props.teaching.columns[cellCol] || this.props.teaching.rows[cellRow]) {

            highlightClass = 'teaching';
        }
        // If this is a cell with same number as the selected one...
        else if (this.props.settings.highlightIdenticalNumbers
            && this.props.value
            && this.props.value === selectedCell.value
        ) {
            highlightClass = 'same-number';
        }
        // If this is a cell within the highlight zones...
        else if (this.props.settings.highlightAreas
            && SudokuHelper.isCellHighlighted(
                { cell: this.props.cell, group: this.props.group },
                coordinates)
        ) {

            highlightClass = 'highlighted';
        }

        if (this.props.annotations && !this.props.value) {
            return {
                content: this.renderAnnotations(),
                annotationClass: 'annotations',
                colorClass: '',
                highlightClass
            };
        }

        if (this.props.solution
            && this.props.solution[this.props.group - 1][this.props.cell - 1] !== this.props.value) {

            colorClass = 'wrong';
        } else if (this.state.startingValue === null) {
            colorClass = 'edit';
        }

        return {
            content: this.props.value,
            annotationClass: '',
            colorClass,
            highlightClass
        };
    }

    render(): JSX.Element {
        const { content, annotationClass, colorClass, highlightClass } = this.getConditionalContent();

        return (
            <div
                className={`cell ${annotationClass} ${colorClass} ${highlightClass}`}
                onClick={() => this.props.cellOnClick({
                    group: this.props.group,
                    cell: this.props.cell,
                })}
            >
                {content}
            </div>
        );
    }
}

interface CellStateToProps {
    selectedCell: {
        coordinates: SelectedCellType;
        value: CellValueType;
    };
    solution: SudokuSolutionType | null;
    mode: GameModeType;
    settings: SettingsType;
    teaching: TeachingState;
    navigation: Pages;
}

const mapStateToProps = (store: StoreState): CellStateToProps => {
    const { selectedCell, solution, mode } = store.game;

    return {
        selectedCell: selectedCell,
        solution: solution,
        mode: mode,
        settings: store.settings,
        teaching: store.teaching,
        navigation: store.navigation
    };
};

export const Cell = connect(
    mapStateToProps, { setSelectedCellCoordinates }
)(CellComponent);
