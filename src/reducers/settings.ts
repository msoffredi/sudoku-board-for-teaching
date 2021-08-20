import { ActionTypes } from "../actions";
import { SetSettingsAction } from "../actions/settings";
import { SettingsType } from "../types";
import { Cookies } from "../utils";

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
        const cookies = new Cookies();
        state = state ?? cookies.settings;
        
        if (action.type === ActionTypes.SetSettings) {
            const settings = {...state, ...action.payload};

            if (settings.maxErrors < 0 || settings.maxErrors > 255) {
                settings.maxErrors = defaultSettings.maxErrors;
            }

            cookies.settings = settings;
            return settings;
        }

        return state;
    };
