import { ActionTypes, LoadGamesAction } from "../actions";
import { GameDataType } from "../types";

export const gamesReducer = 
    (gamesState: GameDataType[] | undefined, action: LoadGamesAction): GameDataType[] => {
        gamesState = gamesState || [];

        if (action.type === ActionTypes.LoadGames) {
            return JSON.parse(JSON.stringify(action.payload));
        }

        return gamesState;
    };
