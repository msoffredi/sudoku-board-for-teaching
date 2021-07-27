import { combineReducers } from "redux";
import { ActionTypes, SetSelectedCellAction } from "../actions";
import { CellCoordinates} from "../components/Cell/Cell";

export type SelectedCell = CellCoordinates | null;

export const selectedCellReducer = 
    (_state: SelectedCell | undefined, action: SetSelectedCellAction): SelectedCell => {
        if (action.type === ActionTypes.SetSelectedCell) {
            return { 
                group: action.payload.group,
                cell: action.payload.cell,
            };
        }
        return null;
    };

export interface GameState {
    selectedCell: SelectedCell;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
});
