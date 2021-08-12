import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { GameStatusType } from "../../types";
import { setGameTime } from "../../actions";
import './Timer.scss';
import { TimerHelper } from "../../utils";

interface TimerProps extends TimerStateToProps {
    setGameTime: typeof setGameTime
}

interface TimerState {
    timer: Date;
}

class TimerComponent extends React.Component<TimerProps, TimerState> {
    state = { timer: new Date(new Date().setHours(0, 0, 0, 0)) };
    timerId: NodeJS.Timeout | null = null;

    componentDidMount(): void {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(): void {
        this.clearTimer();
    }

    clearTimer(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    tick = (): void => {
        if (this.props.gameStatus === GameStatusType.Finished) {
            this.clearTimer();
            return;
        }

        const { timer } = this.state;

        if (this.props.gameStatus === GameStatusType.On) {
            const newTimer = new Date(timer);
            newTimer.setSeconds(timer.getSeconds() + 1);

            this.setState({ timer: newTimer });
        } else if (timer !== this.props.gameTime) {
            this.props.setGameTime(timer);
        }
    };

    render(): JSX.Element {
        return <span id="timer">{TimerHelper.formatTimer(this.state.timer)}</span>;
    }
}

interface TimerStateToProps {
    gameStatus: GameStatusType;
    gameTime: Date;
}

const mapStateToProps = (store: StoreState): TimerStateToProps => {
    const { status, time } = store.game;

    return {
        gameStatus: status,
        gameTime: time
    };
};

export const Timer = connect(
    mapStateToProps,
    { setGameTime }
)(TimerComponent);
