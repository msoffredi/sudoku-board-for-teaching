import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetSelectedCellCoordinatesAction, 
    SetSelectedCellValueAction 
} from "../actions";
import { CellValueType, SelectedCellType } from "../types";

const selectedCellCoordinatesReducer = (
        state: SelectedCellType = null, 
        action: SetSelectedCellCoordinatesAction
    ): SelectedCellType => {

        if (action.type === ActionTypes.SetSelectedCellCoordinates) {
            return Object.assign({}, action.payload);
        }

        return state;
    };

const selectedCellValueReducer = 
    (state: CellValueType = null, action: SetSelectedCellValueAction): CellValueType => {
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
