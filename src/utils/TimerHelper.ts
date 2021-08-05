export class TimerHelper {
    /**
     * This helper method takes a Date object and uses the time portion to 
     * return a formatted time string to represent a timer.
     * 
     * @param timer Time as a Date object (only time portion will be considered)
     * @returns formatted time as a string
     */
    public static formatTimer(timer: Date): string {
        let time = '';

        if (timer.getHours()) {
            time = timer.getHours() + ':';
        }

        const minutes = ((timer.getMinutes() < 10 && time !== '')
            ? '0'
            : '') + timer.getMinutes();
        const seconds = (timer.getSeconds() < 10 ? '0' : '') + timer.getSeconds();

        time = `${time}${minutes}:${seconds}`;

        return time;
    }

}
