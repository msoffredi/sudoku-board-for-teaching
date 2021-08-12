import _Cookies from 'universal-cookie';
import { defaultSettings } from '../reducers/settings';
import { SettingsType } from '../types';

const cookiesName = '_ssbt';

interface CookiesType {
    settings: SettingsType;
}

export class Cookies {
    data: CookiesType;
    cookies: _Cookies;

    constructor() {
        this.cookies = new _Cookies();
        this.data = this.cookies.get(cookiesName);

        if (!this.data) {
            this.data = {
                settings: defaultSettings
            };

            this.save();
        }
    }

    get settings(): SettingsType {
        return this.data.settings;
    }

    set settings(settings: SettingsType) {
        this.data.settings = settings;
        this.save();
    }

    private save(): void {
        this.cookies.set(cookiesName, this.data, { path: '/' });
    }
}
