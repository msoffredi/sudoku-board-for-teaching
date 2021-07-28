import React from "react";
import { CellCoordinates, CellValue, SudokuNumbers } from "../Cell/Cell";
import { CellGroup, CellGroupValues } from "../CellGroup/CellGroup";
import './Sudoku.scss';
import { SelectedCell, StoreState } from "../../reducers";
import { connect } from "react-redux";
import { setSelectedCellCoordinates, setSelectedCellValue } from "../../actions";

export type SudokuValues = [
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues
];

interface SudokuProps {
    values: SudokuValues;
    setSelectedCellCoordinates: typeof setSelectedCellCoordinates;
    setSelectedCellValue: typeof setSelectedCellValue;
}

interface SudokuState {
    values: SudokuValues;
}

class SudokuComponent extends React.Component<SudokuProps, SudokuState> {
    constructor(props: SudokuProps) {
        super(props);

        this.state = {
            values: props.values
        }
    }

    selectCell = (coordinates: CellCoordinates): void => {
        this.props.setSelectedCellCoordinates(coordinates);

        const value = this.props.values[coordinates.group-1][coordinates.cell-1];

        if (value === null || typeof value !== 'object') {
            this.props.setSelectedCellValue(value);
        }
    }

    renderSudoku() {
        return this.props.values.map(
            (element: CellGroupValues, index: number) => {
                return <CellGroup 
                    key={index} 
                    values={element} 
                    cellOnClick={this.selectCell} 
                    group={index+1 as SudokuNumbers}
                    />;
            }
        );
    }

    render() {
        return <div className="sudoku">{this.renderSudoku()}</div>;
    }
}

interface SudokuStateToProps {
    coordinates: SelectedCell;
    value: CellValue;
}

const mapStateToProps = (store: StoreState): SudokuStateToProps => {
    return store.game.selectedCell;
};

export const Sudoku = connect(
    mapStateToProps, { setSelectedCellCoordinates, setSelectedCellValue }
)(SudokuComponent);
