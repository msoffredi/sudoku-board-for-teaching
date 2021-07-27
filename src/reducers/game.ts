import { combineReducers } from "redux";
import { ActionTypes, SetSelectedCellAction } from "../actions";
import { CellCoordinates} from "../components/Cell/Cell";

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
    selectedCell: CellCoordinates | null;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
});
