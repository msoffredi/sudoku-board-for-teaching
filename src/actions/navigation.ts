import { Pages } from "../types";
import { ActionTypes } from "./types";

export interface SetPageAction {
    type: ActionTypes.SetPage;
    payload: Pages;
}

export const setPage = (page: Pages): SetPageAction => {
    return {
        type: ActionTypes.SetPage,
        payload: page
    };
};
