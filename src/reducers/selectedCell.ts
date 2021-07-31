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

const selectedCellValueReducer = 
    (state: CellValueType | undefined, action: SetSelectedCellValueAction): CellValueType => {
        if (action.type === ActionTypes.SetSelectedCellValue) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return null;
    };

export interface SelectedCellState {
    coordinates: SelectedCellType;
    value: CellValueType;
}

export const selectedCellReducer = combineReducers<SelectedCellState>({
    coordinates: selectedCellCoordinatesReducer,
    value: selectedCellValueReducer,
});
