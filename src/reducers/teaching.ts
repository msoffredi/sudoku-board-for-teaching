import { ActionTypes, TeachingActions } from "../actions";
import { TeachingState } from "../types";

const defaultTeachingBar = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
};

const defaultTeachingState: TeachingState = {
    columns: Object.assign({}, defaultTeachingBar),
    rows: Object.assign({}, defaultTeachingBar)
};

export const teachingReducer = 
    (teachingState: TeachingState | undefined, action: TeachingActions): TeachingState => {
        teachingState = teachingState ?? defaultTeachingState;
        const newState = Object.assign({}, teachingState);

        switch (action.type) {
            case ActionTypes.SetTeachingColumn:
                newState.columns[action.payload] = !teachingState.columns[action.payload];
                return newState;

                case ActionTypes.SetTeachingRow:
                    newState.rows[action.payload] = !teachingState.rows[action.payload];
                    return newState;
    
                default: 
                return teachingState;
        }
    };
