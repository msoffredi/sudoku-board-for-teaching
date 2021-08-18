import { ActionTypes, GamesActions } from "../actions";
import { Games, GamesStatus } from "../types";

export const gamesReducer = 
    (gamesState: Games | undefined, action: GamesActions): Games => {
        gamesState = gamesState || { data: [], status: GamesStatus.Null, message: '' };

        switch (action.type) {
            case ActionTypes.LoadGames:
                return action.payload;
            case ActionTypes.SetGames:
                return Object.assign(gamesState, { data: action.payload });
            default:
                return gamesState;
            }
    };
