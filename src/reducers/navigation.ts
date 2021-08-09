import { ActionTypes, SetPageAction } from "../actions";
import { Pages } from "../types";

export const navigationReducer = 
    (state: Pages | undefined, action: SetPageAction): Pages => {
        state = state || Pages.Home;
        
        if (action.type === ActionTypes.SetPage) {
            return action.payload;
        }

        return state;
    };
