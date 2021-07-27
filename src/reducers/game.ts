import { combineReducers } from "redux";
import { ActionTypes, SetSelectedCellAction, SetSelectedNumberAction } from "../actions";
import { CellCoordinates, SudokuNumbers } from "../components/Cell/Cell";

export const selectedNumberReducer = 
    (state: SudokuNumbers = 5, action: SetSelectedNumberAction): SudokuNumbers => {
        switch (action.type) {
            case ActionTypes.SetSelectedNumber:
                return action.payload;
            default:
                return state;
        }
    };

export const selectedCellReducer = 
    (state: CellCoordinates | null = null, action: SetSelectedCellAction): CellCoordinates | null => {
        switch (action.type) {
            case ActionTypes.SetSelectedCell:
                return action.payload;
            default:
                return state;
        }
    };

export interface GameState {
    selectedNumber: SudokuNumbers;
    selectedCell: CellCoordinates | null;
}

export const gameReducer = combineReducers<GameState>({
    selectedNumber: selectedNumberReducer,
    selectedCell: selectedCellReducer,
});
