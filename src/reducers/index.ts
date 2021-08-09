import { combineReducers } from "redux";
import { Pages, SettingsType } from "../types";
import { gameReducer, GameState } from "./game";
import { navigationReducer } from "./navigation";
import { settingsReducer } from "./settings";

export interface StoreState {
    game: GameState;
    settings: SettingsType;
    navigation: Pages;
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer,
    settings: settingsReducer,
    navigation: navigationReducer
});

export * from './game';
export * from './selectedCell';
