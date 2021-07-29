import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetGameUpdatedBoardAction, 
    SetSelectedCellCoordinatesAction, 
    SetSelectedCellValueAction 
} from "../actions";
import { CellCoordinates, CellValue} from "../components/Cell/Cell";
import { SudokuValues } from "../components/Sudoku/Sudoku";

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

const emptySudoku: SudokuValues = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
];

const updatedBoardReducer = 
    (state: SudokuValues | undefined, action: SetGameUpdatedBoardAction): SudokuValues => {
        if (action.type === ActionTypes.SetGameUpdatedBoard) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return emptySudoku;
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
    updatedBoard: SudokuValues;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
    updatedBoard: updatedBoardReducer,
});
