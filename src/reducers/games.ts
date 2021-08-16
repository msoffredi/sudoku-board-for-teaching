import { ActionTypes, LoadGamesAction } from "../actions";
import { GameRow } from "../types";

export const gamesReducer = 
    (gamesState: GameRow[] | undefined, action: LoadGamesAction): GameRow[] => {
        gamesState = gamesState || [];

        if (action.type === ActionTypes.LoadGames) {
            return action.payload;
        }

        return gamesState;
    };
