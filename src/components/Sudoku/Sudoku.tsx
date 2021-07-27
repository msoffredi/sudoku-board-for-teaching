import React from "react";
import { SudokuNumbers } from "../Cell/Cell";
import { CellGroup, CellGroupValues } from "../CellGroup/CellGroup";
import './Sudoku.scss';
import { StoreState } from "../../reducers";
import { connect } from "react-redux";

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
    selectedNumber: SudokuNumbers;
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

    updateCell = (group: SudokuNumbers, cell: SudokuNumbers): void => {
        let values = this.state.values ;
        values[group-1][cell-1] = this.props.selectedNumber;
        this.setState({ values });
    };

    renderSudoku() {
        return this.props.values.map(
            (element: CellGroupValues, index: number) => {
                return <CellGroup 
                    key={index} 
                    values={element} 
                    setValue={this.updateCell} 
                    group={index+1 as SudokuNumbers}
                    />;
            }
        );
    }

    render() {
        return <div className="sudoku">{this.renderSudoku()}</div>;
    }
}

const mapStateToProps = ({ game }: StoreState): { selectedNumber: SudokuNumbers } => {
    return { selectedNumber: game.selectedNumber };
};

export const Sudoku = connect(
    mapStateToProps
)(_Sudoku);
