import { APIGameRow, GameRow, Games, GamesStatus } from "../types";
import { ActionTypes } from ".";
import axios from 'axios';
import { Dispatch } from "redux";

interface LoadGamesAction {
    type: ActionTypes.LoadGames;
    payload: Games;
}

export const loadGames = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        let data: GameRow[] = [];
        let message = '';
        let status = GamesStatus.Success;
        const start = Math.ceil(Math.random()*9999);

        try {
            const response = await axios.get<APIGameRow[]>(
                `${process.env['REACT_APP_API_URL']}/${start}`
            );
            data = response.data.map((row: APIGameRow): GameRow => {
                return {
                    puzzle: JSON.parse(row.puzzle),
                    solution: JSON.parse(row.solution),
                    id: row.id
                };
            });
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

interface SetGamesAction {
    type: ActionTypes.SetGames;
    payload: GameRow[];
}

export const setGames = (games: GameRow[]): SetGamesAction => {
    return {
        type: ActionTypes.SetGames,
        payload: games
    };
};

export type GamesActions = LoadGamesAction | SetGamesAction;
