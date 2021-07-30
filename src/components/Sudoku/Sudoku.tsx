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

interface SudokuProps extends SudokuStateToProps {
    values: SudokuValues;
    setSelectedCellCoordinates: typeof setSelectedCellCoordinates;
    setSelectedCellValue: typeof setSelectedCellValue;
}

class SudokuComponent extends React.Component<SudokuProps> {
    selectCell = (coordinates: CellCoordinates): void => {
        this.props.setSelectedCellCoordinates(coordinates);

        const value = this.props.updatedBoard[coordinates.group - 1][coordinates.cell - 1];

        if (value === null || typeof value !== 'object') {
            this.props.setSelectedCellValue(value);
        }
    };

    renderSudoku = () => {
        const board = this.props.selectedCell.coordinates === null
            ? this.props.values
            : this.props.updatedBoard;

        return board.map(
            (element: CellGroupValues, index: number) => {
                return <CellGroup
                    key={index}
                    values={element}
                    cellOnClick={this.selectCell}
                    group={index + 1 as SudokuNumbers}
                />;
            }
        );
    };

    render() {
        return (
            <div className="sudoku">
                {this.renderSudoku()}
            </div>
        );
    }
}

// @todo review if we really need these states added
interface SudokuStateToProps {
    selectedCell: {
        coordinates: SelectedCell;
        value: CellValue;
    };
    updatedBoard: SudokuValues;
}

const mapStateToProps = (store: StoreState): SudokuStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
        updatedBoard: store.game.updatedBoard
    };
};

export const Sudoku = connect(
    mapStateToProps,
    { setSelectedCellCoordinates, setSelectedCellValue }
)(SudokuComponent);
