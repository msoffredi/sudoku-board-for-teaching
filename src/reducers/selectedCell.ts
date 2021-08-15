import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetSelectedCellCoordinatesAction, 
    SetSelectedCellValueAction 
} from "../actions";
import { CellValueType, SelectedCellType } from "../types";

const selectedCellCoordinatesReducer = (
        state: SelectedCellType | undefined, 
        action: SetSelectedCellCoordinatesAction
    ): SelectedCellType => {
        state = state || null;

        if (action.type === ActionTypes.SetSelectedCellCoordinates) {
            if (action.payload === null) {
                return null;
            }
            
            return Object.assign({}, action.payload);
        }

        return state;
    };

const selectedCellValueReducer = 
    (state: CellValueType | undefined, action: SetSelectedCellValueAction): CellValueType => {
        state = state || null;
        
        if (action.type === ActionTypes.SetSelectedCellValue) {
            return action.payload;
        }

        return state;
    };

export interface SelectedCellState {
    coordinates: SelectedCellType;
    value: CellValueType;
}

export const selectedCellReducer = combineReducers<SelectedCellState>({
    coordinates: selectedCellCoordinatesReducer,
    value: selectedCellValueReducer,
});
