import { GameDataType, Games, GamesStatus } from "../types";
import { ActionTypes } from "./types";
import axios from 'axios';
import { Dispatch } from "redux";

export interface LoadGamesAction {
    type: ActionTypes.LoadGames;
    payload: Games;
}

export const loadGames = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        let data: GameDataType[] = [];
        let status = GamesStatus.Success;
        let message = '';

        try {
            const response = await axios.get<GameDataType[]>(
                process.env['REACT_APP_API_URL'] as string
            );
            data = response.data;
        } catch (error) {
            status = GamesStatus.Error;
            message = error.message;
        }

        dispatch<LoadGamesAction>({
            type: ActionTypes.LoadGames,
            payload: { data, status, message }
        });
    };
};
