import { combineReducers } from "redux";
import { GameRow, Pages, SettingsType } from "../types";
import { gameReducer, GameState } from "./game";
import { gamesReducer } from "./games";
import { navigationReducer } from "./navigation";
import { settingsReducer } from "./settings";

export interface StoreState {
    game: GameState;
    settings: SettingsType;
    navigation: Pages;
    games: GameRow[];
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer,
    settings: settingsReducer,
    navigation: navigationReducer,
    games: gamesReducer
});

export * from './game';
export * from './selectedCell';
export * from './navigation';
export * from './settings';
export * from './games';
