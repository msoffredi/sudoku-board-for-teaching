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
    highlightAreas: true,
    maxErrors: 3
};

export const settingsReducer = 
    (state: SettingsType | undefined, action: SetSettingsAction): SettingsType => {
        state = state || defaultSettings;
        
        if (action.type === ActionTypes.SetSettings) {
            const settings = Object.assign(state, action.payload);

            if (settings.maxErrors < 0 || settings.maxErrors > 255) {
                settings.maxErrors = defaultSettings.maxErrors;
            }

            return settings;
        }

        return state;
    };
