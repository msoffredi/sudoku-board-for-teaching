import { combineReducers } from "redux";
import { gameReducer, GameState } from "./game";

export interface StoreState {
    game: GameState;
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer
});

export * from './game';
export * from './selectedCell';