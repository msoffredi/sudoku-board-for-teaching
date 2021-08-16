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

export enum GamesStatus {
    Success = 'success',
    Error = 'error',
    Null = 'null',
}

export interface Games {
    data: GameRow[];
    status: GamesStatus;
    message: string;
}
