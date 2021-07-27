import { SudokuNumbers } from "../components/Cell/Cell";
import { ActionTypes } from "./types";

export interface SetSelectedNumberAction {
    type: ActionTypes.SetSelectedNumber;
    payload: SudokuNumbers;
}

export const setSelectedNumber = (selectedNumber: SudokuNumbers): SetSelectedNumberAction => {
    return {
        type: ActionTypes.SetSelectedNumber,
        payload: selectedNumber
    };
};
