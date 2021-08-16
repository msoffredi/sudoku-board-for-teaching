import { SudokuSolutionType, SudokuValuesType } from ".";

export interface GameDataType {
    start: SudokuValuesType;
    solution: SudokuSolutionType;
}

export enum GamesStatus {
    Success = 'success',
    Error = 'error',
    Null = 'null',
}

export interface Games {
    data: GameDataType[];
    status: GamesStatus;
    message: string;
}
