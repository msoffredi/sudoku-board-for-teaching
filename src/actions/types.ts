import { SetSelectedCellAction, SetSelectedNumberAction } from "./game";

export enum ActionTypes {
    SetSelectedNumber = 'SET_SELECTED_NUMBERS',
    SetSelectedCell = 'SET_SELECTED_CELL',
}

// Add actions with | 
export type AllActions = SetSelectedNumberAction | SetSelectedCellAction;
