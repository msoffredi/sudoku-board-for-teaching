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
    state: SudokuValuesType = emptySudoku, 
    action: SetGameUpdatedBoardAction
    ): SudokuValuesType => {

        if (action.type === ActionTypes.SetGameUpdatedBoard) {
            return JSON.parse(JSON.stringify(action.payload));
        }

        return state;
    };

const solutionReducer = (
    state: SudokuSolutionType | null = null, 
    action: SetGameSolutionAction
    ): SudokuSolutionType | null => {

        if (action.type === ActionTypes.SetGameSolution) {
            return JSON.parse(JSON.stringify(action.payload));
        }

        return state;
    };

const errorCounterReducer =
    (state = 0, action: SetGameErrorCounterAction): number => {
        if (action.type === ActionTypes.SetGameErrorCounter) {
            return action.payload;
        }

        return state;
    };

const statusReducer =
    (state: GameStatusType = GameStatusType.Off, action: SetGameStatusAction): GameStatusType => {
        if (action.type === ActionTypes.SetGameStatus) {
            return action.payload;
        }

        return state;
    };

const modeReducer = 
    (state: GameModeType = GameModeType.Edit, action: SetGameModeAction): GameModeType => {
        if (action.type === ActionTypes.SetGameMode) {
            return action.payload;
        }

        return state;
    };

const timerStart = new Date(new Date().setHours(0, 0, 0, 0));

const timeReducer =
    (state: Date = timerStart, action: SetGameTimeAction): Date => {
        if (action.type === ActionTypes.SetGameTime) {
            return Object.assign({}, action.payload);
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
