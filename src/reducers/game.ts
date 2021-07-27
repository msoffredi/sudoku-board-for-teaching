import { combineReducers } from "redux";
import { ActionTypes, SetSelectedNumberAction } from "../actions";
import { SudokuNumbers } from "../components/Cell/Cell";

export const selectedNumberReducer = 
    (state: SudokuNumbers = 5, action: SetSelectedNumberAction): SudokuNumbers => {
        switch (action.type) {
            case ActionTypes.SetSelectedNumber:
                return action.payload;
            default:
                return state;
        }
    };

export interface GameState {
    selectedNumber: SudokuNumbers;
}

export const gameReducer = combineReducers<GameState>({
    selectedNumber: selectedNumberReducer
});