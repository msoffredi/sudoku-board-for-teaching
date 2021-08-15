import { GameDataType } from "../types";
import { ActionTypes } from "./types";
import axios from 'axios';
import { Dispatch } from "redux";

export interface LoadGamesAction {
    type: ActionTypes.LoadGames;
    payload: GameDataType[];
}

export const loadGames = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        let data: GameDataType[] = [];

        try {
            const response = await axios.get<GameDataType[]>(
                process.env['REACT_APP_API_URL'] as string
            );
            data = response.data;
        } catch (error) {
            console.log(error);
        }

        dispatch<LoadGamesAction>({
            type: ActionTypes.LoadGames,
            payload: data
        });
    };
};
