import { combineReducers } from "redux";
import { SettingsType } from "../types";
import { gameReducer, GameState } from "./game";
import { settingsReducer } from "./settings";

export interface StoreState {
    game: GameState;
    settings: SettingsType;
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer,
    settings: settingsReducer
});

export * from './game';
export * from './selectedCell';