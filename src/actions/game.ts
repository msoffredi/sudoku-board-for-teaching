import { 
    CellCoordinatesType, 
    CellValueType, 
    GameModeType, 
    GameStatusType, 
    SudokuSolutionType, 
    SudokuValuesType
} from "../types";
import { ActionTypes } from "./types";

export interface SetSelectedCellCoordinatesAction {
    type: ActionTypes.SetSelectedCellCoordinates;
    payload: CellCoordinatesType;
}

export const setSelectedCellCoordinates = 
    (coordinates: CellCoordinatesType): SetSelectedCellCoordinatesAction => {

    return {
        type: ActionTypes.SetSelectedCellCoordinates,
        payload: coordinates
    };
};

export interface SetSelectedCellValueAction {
    type: ActionTypes.SetSelectedCellValue;
    payload: CellValueType;
}

export const setSelectedCellValue = (value: CellValueType): SetSelectedCellValueAction => {
    return {
        type: ActionTypes.SetSelectedCellValue,
        payload: value
    };
};

export interface SetGameUpdatedBoardAction {
    type: ActionTypes.SetGameUpdatedBoard;
    payload: SudokuValuesType;
}

export const setGameUpdatedBoard = (sudoku: SudokuValuesType): SetGameUpdatedBoardAction => {
    return {
        type: ActionTypes.SetGameUpdatedBoard,
        payload: sudoku
    };
};

export interface SetGameSolutionAction {
    type: ActionTypes.SetGameSolution;
    payload: SudokuSolutionType;
}

export const setGameSolution = (sudoku: SudokuSolutionType): SetGameSolutionAction => {
    return {
        type: ActionTypes.SetGameSolution,
        payload: sudoku
    };
};

export interface SetGameErrorCounterAction {
    type: ActionTypes.SetGameErrorCounter;
    payload: number;
}

export const setGameErrorCounter = (counter: number): SetGameErrorCounterAction => {
    return {
        type: ActionTypes.SetGameErrorCounter,
        payload: counter
    };
};

export interface SetGameStatusAction {
    type: ActionTypes.SetGameStatus;
    payload: GameStatusType;
}

export const setGameStatus = (status: GameStatusType): SetGameStatusAction => {
    return {
        type: ActionTypes.SetGameStatus,
        payload: status
    };
};

export interface SetGameModeAction {
    type: ActionTypes.SetGameMode;
    payload: GameModeType;
}

export const setGameMode = (mode: GameModeType): SetGameModeAction => {
    return {
        type: ActionTypes.SetGameMode,
        payload: mode
    };
};
