import React from "react";
import './Timer.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TimerProps { }

interface TimerState {
    timer: Date;
}

export class Timer extends React.Component<TimerProps, TimerState> {
    timerId: NodeJS.Timeout | null = null;

    constructor(props: TimerProps) {
        super(props);

        this.state = { timer: new Date(new Date().setHours(0, 0, 0, 0)) };
    }

    componentDidMount(): void {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    tick = (): void => {
        const timer = new Date(this.state.timer);
        timer.setSeconds(timer.getSeconds() + 1);

        this.setState({
            timer
        });
    };

    renderTime(): string {
        const timer = this.state.timer;
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

    render(): JSX.Element {
        return <span id="timer">{this.renderTime()}</span>;
    }
}
