import { CellCoordinates, SudokuNumbers } from "../components/Cell/Cell";
import { ActionTypes } from "./types";

export interface SetSelectedNumberAction {
    type: ActionTypes.SetSelectedNumber;
    payload: SudokuNumbers;
}

export interface SetSelectedCellAction {
    type: ActionTypes.SetSelectedCell;
    payload: CellCoordinates;
}

export const setSelectedNumber = (selectedNumber: SudokuNumbers): SetSelectedNumberAction => {
    return {
        type: ActionTypes.SetSelectedNumber,
        payload: selectedNumber
    };
};

export const setSelectedCell = (coordinates: CellCoordinates): SetSelectedCellAction => {
    return {
        type: ActionTypes.SetSelectedCell,
        payload: coordinates
    };
}
