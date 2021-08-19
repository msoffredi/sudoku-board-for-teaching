import { combineReducers } from "redux";
import { 
    ActionTypes, 
    SetGameErrorCounterAction, 
    SetGameModeAction, 
    SetGameSolutionAction, 
    SetGameStatusAction, 
    SetGameTimeAction, 
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
        state = state ?? emptySudoku;

        if (action.type === ActionTypes.SetGameUpdatedBoard) {
            return action.payload;
        }

        return state;
    };

const solutionReducer = (
    state: SudokuSolutionType | null | undefined, 
    action: SetGameSolutionAction
    ): SudokuSolutionType | null => {
        state = state ?? null;

        if (action.type === ActionTypes.SetGameSolution) {
            return action.payload;
        }

        return state;
    };

const errorCounterReducer =
    (state: number | undefined, action: SetGameErrorCounterAction): number => {
        state = state ?? 0;

        if (action.type === ActionTypes.SetGameErrorCounter) {
            return action.payload;
        }

        return state;
    };

const statusReducer =
    (state: GameStatusType | undefined, action: SetGameStatusAction): GameStatusType => {
        state = state ?? GameStatusType.Off;

        if (action.type === ActionTypes.SetGameStatus) {
            return action.payload;
        }

        return state;
    };

const modeReducer = 
    (state: GameModeType| undefined, action: SetGameModeAction): GameModeType => {
        state = state ?? GameModeType.Edit;

        if (action.type === ActionTypes.SetGameMode) {
            return action.payload;
        }

        return state;
    };

const timerStart = new Date(new Date().setHours(0, 0, 0, 0));

const timeReducer =
    (state: Date | undefined, action: SetGameTimeAction): Date => {
        state = state ?? timerStart;

        if (action.type === ActionTypes.SetGameTime) {
            return action.payload;
        }

        return state;
    };

export interface GameState {
    selectedCell: SelectedCellState;
    updatedBoard: SudokuValuesType;
    solution: SudokuSolutionType | null;
    errorCounter: number;
    status: GameStatusType;
    mode: GameModeType;
    time: Date;
}

export const gameReducer = combineReducers<GameState>({
    selectedCell: selectedCellReducer,
    updatedBoard: updatedBoardReducer,
    solution: solutionReducer,
    errorCounter: errorCounterReducer,
    status: statusReducer,
    mode: modeReducer,
    time: timeReducer
});
