import { CellCoordinates } from "../components/Cell/Cell";
import { ActionTypes } from "./types";

export interface SetSelectedCellAction {
    type: ActionTypes.SetSelectedCell;
    payload: CellCoordinates;
}

export const setSelectedCell = (coordinates: CellCoordinates): SetSelectedCellAction => {
    return {
        type: ActionTypes.SetSelectedCell,
        payload: coordinates
    };
}
