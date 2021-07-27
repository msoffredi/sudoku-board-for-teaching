import { combineReducers } from "redux";
import { gameReducer, GameState } from "./game";

interface StoreState {
    game: GameState;
}

export const reducers = combineReducers<StoreState>({
    game: gameReducer
});
