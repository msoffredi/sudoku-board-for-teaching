import React from "react";
import { CellGroup } from "../.";
import './Sudoku.scss';
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { setSelectedCellCoordinates, setSelectedCellValue } from "../../actions";
import {
    CellCoordinatesType,
    CellGroupValuesType,
    SelectedCellType,
    SudokuNumbersType,
    SudokuValuesType
} from "../../types";

interface SudokuProps extends SudokuStateToProps {
    values: SudokuValuesType;
    setSelectedCellCoordinates: typeof setSelectedCellCoordinates;
    setSelectedCellValue: typeof setSelectedCellValue;
}

class SudokuComponent extends React.Component<SudokuProps> {
    selectCell = (coordinates: CellCoordinatesType): void => {
        this.props.setSelectedCellCoordinates(coordinates);

        const value = this.props.updatedBoard[coordinates.group - 1][coordinates.cell - 1];

        if (value === null || typeof value !== 'object') {
            this.props.setSelectedCellValue(value);
        } else if (Array.isArray(value)) {
            this.props.setSelectedCellValue(null);
        }
    };

    renderSudoku = () => {
        const board = this.props.coordinates === null
            ? this.props.values
            : this.props.updatedBoard;

        return board.map(
            (element: CellGroupValuesType, index: number) => {
                return <CellGroup
                    key={index}
                    values={element}
                    cellOnClick={this.selectCell}
                    group={index + 1 as SudokuNumbersType}
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

interface SudokuStateToProps {
    coordinates: SelectedCellType;
    updatedBoard: SudokuValuesType;
}

const mapStateToProps = (store: StoreState): SudokuStateToProps => {
    return {
        coordinates: store.game.selectedCell.coordinates,
        updatedBoard: store.game.updatedBoard
    };
};

export const Sudoku = connect(
    mapStateToProps,
    { setSelectedCellCoordinates, setSelectedCellValue }
)(SudokuComponent);
