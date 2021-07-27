import { combineReducers } from "redux";
import { ActionTypes, SetSelectedNumberAction } from "../actions";
import { CellValue } from "../components/Cell/Cell";

export const selectedNumberReducer = 
    (state: CellValue = 5, action: SetSelectedNumberAction): CellValue => {
        switch (action.type) {
            case ActionTypes.SetSelectedNumber:
                return action.payload;
            default:
                return state;
        }
    };

export interface GameState {
    selectedNumber: CellValue;
}

export const gameReducer = combineReducers<GameState>({
    selectedNumber: selectedNumberReducer
});