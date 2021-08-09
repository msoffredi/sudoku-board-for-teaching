import { ActionTypes, SetPageAction } from "../actions";
import { Pages } from "../types";

export const navigationReducer = 
    (state: Pages = Pages.Home, action: SetPageAction): Pages => {
        if (action.type === ActionTypes.SetPage) {
            return action.payload;
        }

        return state;
    };
