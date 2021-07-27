import React from "react";
import { connect } from "react-redux";
import { SelectedCell, StoreState } from "../../reducers";
import { SudokuHelper } from "../../utils";
import './Cell.scss';
import { setSelectedCell } from "../../actions";

export enum CellMode {
    Edit,
    Annotate
}

export interface CellCoordinates {
    group: SudokuNumbers,
    cell: SudokuNumbers,
}

// 9 numbers = all possible annotations for a cell (1-9), 0 = no annotation
export type Annotations = [
    1 | null, 
    2 | null, 
    3 | null, 
    4 | null, 
    5 | null, 
    6 | null, 
    7 | null, 
    8 | null, 
    9 | null
];

export type SudokuNumbers = 1|2|3|4|5|6|7|8|9;
export type CellValue = SudokuNumbers | null;

interface CellProps extends CellStateToProps {
    mode: CellMode;
    value?: CellValue;
    annotations?: Annotations | null;
    group: SudokuNumbers;
    cell: SudokuNumbers;
    cellOnClick: (coordinates: CellCoordinates) => void;
}

interface CellState {
    startingValue: CellValue;
}

class CellComponent extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);

        this.state = {
            startingValue: this.props.value ? this.props.value : null,
        }
    }

    renderAnnotations() {
        if (this.props.annotations) {
            return this.props.annotations.map((element: CellValue, index: number) => {
                return <div key={index} className="annotation">{element}</div>;
            });
        }

        return null;
    }

    // @todo Add some type to return value
    getConditionalContent() {
        const { cell, group, selectedCellCoordinates } = this.props;
        let highlightClass = '';

        // If this is the selected cell...
        if (cell === selectedCellCoordinates?.cell && group === selectedCellCoordinates?.group) {
            highlightClass = 'selected';
        } 
        // If this is a cell within the highlight zones...
        else if (SudokuHelper.isCellHighlighted(
            { cell: this.props.cell, group: this.props.group },
            selectedCellCoordinates)) {

            highlightClass = 'highlighted';
        }

        if (this.props.mode === CellMode.Annotate) {
            return {
                content: this.renderAnnotations(),
                annotationClass: 'annotations',
                colorClass: '',
                highlightClass,
            };
        }

        const colorClass = this.state.startingValue === null ? 'edit' : '';

        return {
            content: this.props.value,
            annotationClass: '',
            colorClass,
            highlightClass,
        };
    }

    render() {
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
    selectedCellCoordinates: SelectedCell;
}

const mapStateToProps = (store: StoreState): CellStateToProps => {
    return { 
        selectedCellCoordinates: store.game.selectedCell 
    };
};

export const Cell = connect(
    mapStateToProps, { setSelectedCell }
)(CellComponent);