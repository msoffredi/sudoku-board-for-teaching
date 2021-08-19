import { combineReducers } from "redux";
import { Games, Pages, SettingsType, TeachingState } from "../types";
import { gameReducer, GameState } from "./game";
import { gamesReducer } from "./games";
import { navigationReducer } from "./navigation";
import { settingsReducer } from "./settings";
import { teachingReducer } from "./teaching";

export interface StoreState {
    game: GameState;
    settings: SettingsType;
    navigation: Pages;
    games: Games;
    teaching: TeachingState;
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer,
    settings: settingsReducer,
    navigation: navigationReducer,
    games: gamesReducer,
    teaching: teachingReducer
});

export * from './game';
export * from './selectedCell';
export * from './navigation';
export * from './settings';
export * from './games';
export * from './teaching';
