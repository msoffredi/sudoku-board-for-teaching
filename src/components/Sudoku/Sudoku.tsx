import React from "react";
import { CellCoordinates, SudokuNumbers } from "../Cell/Cell";
import { CellGroup, CellGroupValues } from "../CellGroup/CellGroup";
import './Sudoku.scss';
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { setSelectedCell } from "../../actions";

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
    setSelectedCell: typeof setSelectedCell;
}

interface SudokuState {
    values: SudokuValues;
}

class _Sudoku extends React.Component<SudokuProps, SudokuState> {
    constructor(props: SudokuProps) {
        super(props);

        this.state = {
            values: props.values
        }
    }

    selectCell = (coordinates: CellCoordinates): void => {
        this.props.setSelectedCell(coordinates);
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
    selectedCellCoordinates: CellCoordinates | null;
}

const mapStateToProps = (store: StoreState): SudokuStateToProps => {
    return { 
        selectedCellCoordinates: store.game.selectedCell 
    };
};

export const Sudoku = connect(
    mapStateToProps, { setSelectedCell }
)(_Sudoku);
