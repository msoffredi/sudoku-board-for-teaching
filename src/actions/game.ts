import { CellValue } from "../components/Cell/Cell";
import { ActionTypes } from "./types";

export interface SetSelectedNumberAction {
    type: ActionTypes.SetSelectedNumber;
    payload: CellValue;
}

export const setSelectedNumber = (selectedNumber: CellValue): SetSelectedNumberAction => {
    return {
        type: ActionTypes.SetSelectedNumber,
        payload: selectedNumber
    };
};
