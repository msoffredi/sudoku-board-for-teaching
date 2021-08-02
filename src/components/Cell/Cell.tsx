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
    SelectedCellType,
    SudokuNumbersType,
    SudokuSolutionType
} from "../../types";

type HighlightClassType = '' | 'same-number' | 'selected' | 'highlighted';
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
        let highlightClass: HighlightClassType = '';
        let colorClass: ColorClassType = '';

        // If this is the selected cell...
        if (cell === selectedCell.coordinates?.cell
            && group === selectedCell.coordinates?.group) {

            highlightClass = 'selected';
        }
        // If this is a cell with same number as the selected one...
        else if (this.props.value && this.props.value === this.props.selectedCell.value) {
            highlightClass = 'same-number';
        }
        // If this is a cell within the highlight zones...
        else if (SudokuHelper.isCellHighlighted(
            { cell: this.props.cell, group: this.props.group },
            selectedCell.coordinates)) {

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
}

const mapStateToProps = (store: StoreState): CellStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
        solution: store.game.solution,
        mode: store.game.mode
    };
};

export const Cell = connect(
    mapStateToProps, { setSelectedCellCoordinates }
)(CellComponent);
