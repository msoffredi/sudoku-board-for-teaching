import { defaultSettings } from '../reducers';
import _Cookies from 'universal-cookie';
import { cookiePath, Cookies, cookiesName } from './Cookies';
jest.mock('universal-cookie');

const mockedCookies = <jest.Mock<_Cookies>>_Cookies;

describe('Cookies class tests', () => {
    let cookies: Cookies;

    beforeEach(() => {
        mockedCookies.mockClear();
        cookies = new Cookies();
    });

    it('Initializes well', () => {
        expect(cookies.data.settings).toMatchObject(defaultSettings);

        // Check if .get() and .set() were called in the universal-cookie class
        const mockGet = mockedCookies.mock.instances[0].get;
        const mockSet = mockedCookies.mock.instances[0].set;
        expect(mockGet).toHaveBeenCalledWith(cookiesName);
        expect(mockSet).toHaveBeenCalledWith(cookiesName, cookies.data, { path: cookiePath });
    });

    it('settings getters and setters methods work as expected', () => {
        const newSettings = {
            hideUsedNumbers: true,
            highlightIdenticalNumbers: false,
            highlightAreas: true,
            maxErrors: 9
        };
        cookies.settings = {...newSettings};
        expect(cookies.settings).toMatchObject(newSettings);

        const mockSet = mockedCookies.mock.instances[0].set;
        expect(mockSet).toHaveBeenCalledWith(cookiesName, cookies.data, { path: cookiePath });
    });
});
