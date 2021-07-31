import { 
    CellCoordinatesType, 
    CellValueType, 
    SudokuSolutionType, 
    SudokuValuesType
} from "../types";
import { ActionTypes } from "./types";

export interface SetSelectedCellCoordinatesAction {
    type: ActionTypes.SetSelectedCellCoordinates;
    payload: CellCoordinatesType;
}

export interface SetSelectedCellValueAction {
    type: ActionTypes.SetSelectedCellValue;
    payload: CellValueType;
}

export interface SetGameUpdatedBoardAction {
    type: ActionTypes.SetGameUpdatedBoard;
    payload: SudokuValuesType;
}

export interface SetGameSolutionAction {
    type: ActionTypes.SetGameSolution;
    payload: SudokuSolutionType;
}

export interface SetGameErrorCounterAction {
    type: ActionTypes.SetGameErrorCounter;
    payload: number;
}

export const setSelectedCellCoordinates = 
    (coordinates: CellCoordinatesType): SetSelectedCellCoordinatesAction => {

    return {
        type: ActionTypes.SetSelectedCellCoordinates,
        payload: coordinates
    };
};

export const setSelectedCellValue = (value: CellValueType): SetSelectedCellValueAction => {
    return {
        type: ActionTypes.SetSelectedCellValue,
        payload: value
    };
};

export const setGameUpdatedBoard = (sudoku: SudokuValuesType): SetGameUpdatedBoardAction => {
    return {
        type: ActionTypes.SetGameUpdatedBoard,
        payload: sudoku
    };
};

export const setGameSolution = (sudoku: SudokuSolutionType): SetGameSolutionAction => {
    return {
        type: ActionTypes.SetGameSolution,
        payload: sudoku
    };
};

export const setGameErrorCounter = (counter: number): SetGameErrorCounterAction => {
    return {
        type: ActionTypes.SetGameErrorCounter,
        payload: counter
    };
};
