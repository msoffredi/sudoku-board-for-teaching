import { CellCoordinates, CellValue } from "../components/Cell/Cell";
import { SudokuSolution } from "../components/Game/Game";
import { SudokuValues } from "../components/Sudoku/Sudoku";
import { ActionTypes } from "./types";

export interface SetSelectedCellCoordinatesAction {
    type: ActionTypes.SetSelectedCellCoordinates;
    payload: CellCoordinates;
}

export interface SetSelectedCellValueAction {
    type: ActionTypes.SetSelectedCellValue;
    payload: CellValue;
}

export interface SetGameUpdatedBoardAction {
    type: ActionTypes.SetGameUpdatedBoard;
    payload: SudokuValues;
}

export interface SetGameSolution {
    type: ActionTypes.SetGameSolution;
    payload: SudokuSolution;
}

export interface SetGameErrorCounter {
    type: ActionTypes.SetGameErrorCounter;
    payload: number;
}

export const setSelectedCellCoordinates = 
    (coordinates: CellCoordinates): SetSelectedCellCoordinatesAction => {

    return {
        type: ActionTypes.SetSelectedCellCoordinates,
        payload: coordinates
    };
};

export const setSelectedCellValue = (value: CellValue): SetSelectedCellValueAction => {
    return {
        type: ActionTypes.SetSelectedCellValue,
        payload: value
    };
};

export const setGameUpdatedBoard = (sudoku: SudokuValues): SetGameUpdatedBoardAction => {
    return {
        type: ActionTypes.SetGameUpdatedBoard,
        payload: sudoku
    };
};

export const setGameSolution = (sudoku: SudokuSolution): SetGameSolution => {
    return {
        type: ActionTypes.SetGameSolution,
        payload: sudoku
    };
};

export const setGameErrorCounter = (counter: number): SetGameErrorCounter => {
    return {
        type: ActionTypes.SetGameErrorCounter,
        payload: counter
    };
};
