import { APIGameRow, GameRow } from "../types";
import { ActionTypes } from ".";
import axios from 'axios';
import { Dispatch } from "redux";

export interface LoadGamesAction {
    type: ActionTypes.LoadGames;
    payload: GameRow[];
}

export const loadGames = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        let data: GameRow[] = [];

        try {
            const response = await axios.get<APIGameRow[]>(
                process.env['REACT_APP_API_URL'] as string
            );
            data = response.data.map((row: APIGameRow): GameRow => {
                return {
                    puzzle: JSON.parse(row.puzzle),
                    solution: JSON.parse(row.solution),
                    id: row.id
                };
            });
        } catch (error) {
            console.log(error);
        }

        dispatch<LoadGamesAction>({
            type: ActionTypes.LoadGames,
            payload: data
        });
    };
};
