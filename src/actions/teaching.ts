import { SudokuNumbersType } from "../types";
import { ActionTypes } from "./types";

export interface SetTeachingColumnAction {
    type: ActionTypes.SetTeachingColumn;
    payload: SudokuNumbersType;
}

export const setTeachingColumn = (column: SudokuNumbersType): SetTeachingColumnAction => {
    return {
        type: ActionTypes.SetTeachingColumn,
        payload: column
    };
};

export interface SetTeachingRowAction {
    type: ActionTypes.SetTeachingRow;
    payload: SudokuNumbersType;
}

export const setTeachingRow = (row: SudokuNumbersType): SetTeachingRowAction => {
    return {
        type: ActionTypes.SetTeachingRow,
        payload: row
    };
};

export type TeachingActions = SetTeachingColumnAction | SetTeachingRowAction;
