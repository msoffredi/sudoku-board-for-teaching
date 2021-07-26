import React from "react";
import { CellGroup, CellGroupValues } from "../CellGroup/CellGroup";
import './Sudoku.scss';

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
}

export class Sudoku extends React.Component<SudokuProps> {
    renderSudoku() {
        return this.props.values.map(
            (element: CellGroupValues, index: number) => {
                return <CellGroup key={index} values={element} />;
            }
        );
    }

    render() {
        return <div className="sudoku">{this.renderSudoku()}</div>;
    }
}
