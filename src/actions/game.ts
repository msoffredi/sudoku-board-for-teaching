import { CellCoordinates, CellValue } from "../components/Cell/Cell";
import { ActionTypes } from "./types";

export interface SetSelectedCellCoordinatesAction {
    type: ActionTypes.SetSelectedCellCoordinates;
    payload: CellCoordinates;
}

export interface SetSelectedCellValueAction {
    type: ActionTypes.SetSelectedCellValue;
    payload: CellValue;
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
