import { SetSelectedNumberAction } from "./game";

export enum ActionTypes {
    SetSelectedNumber = 'SET_SELECTED_NUMBERS',
}

// Add actions with | 
export type AllActions = SetSelectedNumberAction;
