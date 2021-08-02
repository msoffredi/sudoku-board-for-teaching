import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetGameErrorCounterAction, 
    SetGameModeAction, 
    SetGameSolutionAction, 
    SetGameStatusAction, 
    SetGameUpdatedBoardAction 
} from "../actions";
import { CellGroupValuesType, GameModeType, GameStatusType, SudokuSolutionType, SudokuValuesType } from "../types";
import { selectedCellReducer, SelectedCellState } from "./selectedCell";

const emptyGroup = [
        null, null, null, null, null, null, null, null, null
    ] as CellGroupValuesType;

const emptySudoku: SudokuValuesType = [
    emptyGroup, emptyGroup, emptyGroup, emptyGroup, emptyGroup,
    emptyGroup, emptyGroup, emptyGroup, emptyGroup
];

const updatedBoardReducer = (
    state: SudokuValuesType | undefined, 
    action: SetGameUpdatedBoardAction
    ): SudokuValuesType => {

        if (action.type === ActionTypes.SetGameUpdatedBoard) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return emptySudoku;
    };

const solutionReducer = (
    state: SudokuSolutionType | null | undefined, 
    action: SetGameSolutionAction
    ): SudokuSolutionType | null => {

        if (action.type === ActionTypes.SetGameSolution) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return null;
    };

const errorCounterReducer =
    (state: number | undefined, action: SetGameErrorCounterAction): number => {
        if (action.type === ActionTypes.SetGameErrorCounter) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return 0;
    };

const statusReducer =
    (state: GameStatusType | undefined, action: SetGameStatusAction): GameStatusType => {
        if (action.type === ActionTypes.SetGameStatus) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return GameStatusType.Off;
    };

const modeReducer = 
    (state: GameModeType | undefined, action: SetGameModeAction): GameModeType => {
        if (action.type === ActionTypes.SetGameMode) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return GameModeType.Edit;
    };

export interface GameState {
    selectedCell: SelectedCellState;
    updatedBoard: SudokuValuesType;
    solution: SudokuSolutionType | null;
    errorCounter: number;
    status: GameStatusType;
    mode: GameModeType;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
    updatedBoard: updatedBoardReducer,
    solution: solutionReducer,
    errorCounter: errorCounterReducer,
    status: statusReducer,
    mode: modeReducer
});
