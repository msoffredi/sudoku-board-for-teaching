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
    columns: {...defaultTeachingBar},
    rows: {...defaultTeachingBar}
};

export const teachingReducer = 
    (teachingState: TeachingState | undefined, action: TeachingActions): TeachingState => {
        teachingState = teachingState ?? defaultTeachingState;

        switch (action.type) {
            case ActionTypes.SetTeachingColumn:
                return {
                    ...teachingState, 
                    columns: {
                        ...teachingState.columns, 
                        [action.payload]: !teachingState.columns[action.payload]
                    }
                };

            case ActionTypes.SetTeachingRow:
                return {
                    ...teachingState, 
                    rows: {
                        ...teachingState.rows, 
                        [action.payload]: !teachingState.rows[action.payload]
                    }
                };

            default: 
                return teachingState;
        }
    };
