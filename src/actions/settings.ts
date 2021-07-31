import { SettingsType } from "../types";
import { ActionTypes } from "./types";

export interface SetSettingsAction {
    type: ActionTypes.SetSettings;
    payload: SettingsType;
}

export const setSetting = (settings: SettingsType): SetSettingsAction => {
    return {
        type: ActionTypes.SetSettings,
        payload: settings
    };
};
