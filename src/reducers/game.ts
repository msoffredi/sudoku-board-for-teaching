import { combineReducers } from "redux";
import { ActionTypes, SetGameSolution, SetGameUpdatedBoardAction } from "../actions";
import { CellGroupValues } from "../components/CellGroup/CellGroup";
import { SudokuSolution } from "../components/Game/Game";
import { SudokuValues } from "../components/Sudoku/Sudoku";
import { selectedCellReducer, SelectedCellState } from "./selectedCell";

const emptyGroup = [
        null, null, null, null, null, null, null, null, null
    ] as CellGroupValues;

const emptySudoku: SudokuValues = [
    emptyGroup, emptyGroup, emptyGroup, emptyGroup, emptyGroup,
    emptyGroup, emptyGroup, emptyGroup, emptyGroup
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

const solutionReducer = 
    (state: SudokuSolution | null | undefined, action: SetGameSolution): SudokuSolution | null => {
        if (action.type === ActionTypes.SetGameSolution) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return null;
    };

export interface GameState {
    selectedCell: SelectedCellState;
    updatedBoard: SudokuValues;
    solution: SudokuSolution | null;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
    updatedBoard: updatedBoardReducer,
    solution: solutionReducer
});
