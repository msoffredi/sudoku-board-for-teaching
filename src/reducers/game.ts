import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetSelectedCellCoordinatesAction, 
    SetSelectedCellValueAction 
} from "../actions";
import { CellCoordinates, CellValue} from "../components/Cell/Cell";

export type SelectedCell = CellCoordinates | null;

export const selectedCellCoordinatesReducer = 
    (state: SelectedCell | undefined, action: SetSelectedCellCoordinatesAction): SelectedCell => {
        if (action.type === ActionTypes.SetSelectedCellCoordinates) {
            return { 
                group: action.payload.group,
                cell: action.payload.cell,
            };
        } else if (state) {
            return state;
        }

        return null;
    };

export const selectedCellValueReducer = 
    (state: CellValue | undefined, action: SetSelectedCellValueAction): CellValue => {
        if (action.type === ActionTypes.SetSelectedCellValue) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return null;
    };

export interface SelectedCellState {
    coordinates: SelectedCell;
    value: CellValue;
}

const selectedCellReducer = combineReducers<SelectedCellState>({
    coordinates: selectedCellCoordinatesReducer,
    value: selectedCellValueReducer,
});

export interface GameState {
    selectedCell: SelectedCellState;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
});
