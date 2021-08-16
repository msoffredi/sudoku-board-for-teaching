import { ActionTypes, LoadGamesAction } from "../actions";
import { Games, GamesStatus } from "../types";

export const gamesReducer = 
    (gamesState: Games | undefined, action: LoadGamesAction): Games => {
        gamesState = gamesState || { data: [], status: GamesStatus.Null, message: '' };

        if (action.type === ActionTypes.LoadGames) {
            return action.payload;
        }

        return gamesState;
    };
