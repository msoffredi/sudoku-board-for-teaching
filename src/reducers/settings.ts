import { ActionTypes } from "../actions";
import { SetSettingsAction } from "../actions/settings";
import { SettingsType } from "../types";

/**
 * This is how a new annonymous game will start and also the default
 * settings for new users.
 */
export const defaultSettings: SettingsType = {
    hideUsedNumbers: false,
    highlightIdenticalNumbers: true,
    highlightAreas: true
};

export const settingsReducer = 
    (state: SettingsType | undefined, action: SetSettingsAction): SettingsType => {
        if (action.type === ActionTypes.SetSettings) {
            return action.payload;
        } else if (state) {
            return state;
        }

        return defaultSettings;
    };
