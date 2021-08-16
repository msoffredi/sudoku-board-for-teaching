import { SudokuSolutionType, SudokuValuesType } from ".";

export interface APIGameRow {
    puzzle: string;
    solution: string;
    id: string;
}

export interface GameRow {
    puzzle: SudokuValuesType;
    solution: SudokuSolutionType;
    id: string;
}
