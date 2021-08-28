import { TimerHelper } from './TimerHelper';

describe('TimerHelper tests', () => {
    it.each([
        [0, 0, 0, '0:00'],
        [0, 2, 35, '2:35'],
        [0, 10, 9, '10:09'],
        [0, 0, 3, '0:03'],
        [1, 2, 3, '1:02:03'],
    ])('Returns time as string for: %i, %1, %1 => %s', (
        hours: number, 
        minutes: number, 
        seconds: number, 
        result: string
    ) => {
        expect(TimerHelper.formatTimer(new Date(0, 0, 0, hours, minutes, seconds))).toEqual(result);
    });
});
