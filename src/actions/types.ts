import { SetSelectedCellAction } from "./game";

export enum ActionTypes {
    SetSelectedCell = 'SET_SELECTED_CELL',
}

// Add actions with | 
export type AllActions = SetSelectedCellAction;
