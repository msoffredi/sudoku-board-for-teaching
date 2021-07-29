import { CellCoordinates, CellValue } from "../components/Cell/Cell";
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
