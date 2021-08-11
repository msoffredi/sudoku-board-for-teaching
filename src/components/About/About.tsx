import React from "react";
import { PageContainer } from "../PageContainer/PageContainer";
import './About.scss';

interface AboutProps {
    closeEvent: () => void;
}

interface AboutState {
    open: boolean;
}

export class About extends React.Component<AboutProps, AboutState> {
    state = { open: false };

    closePage = (): void => {
        // This avoids the first trigger when we clicked on the menu
        if (this.state.open) {
            this.props.closeEvent();
        } else {
            this.setState({ open: true });
        }
    };

    componentDidMount(): void {
        document.body.addEventListener('click', this.closePage);
    }

    componentWillUnmount(): void {
        document.body.removeEventListener('click', this.closePage);
    }

    render(): JSX.Element {
        return (
            <PageContainer>
                <div className="container-center">
                    <div id="about">
                        <h3>Sudoku Board For Teaching</h3>
                        <p>v0.1.0</p>
                        <p>You can check the code in&nbsp;
                            <a
                                href="https://github.com/msoffredi/sudoku-board-for-teaching"
                                target="_blank"
                            >
                                GitHub
                            </a>.
                        </p>
                        <p>You can learn more about the project in our&nbsp;
                            <a
                                href="https://github.com/msoffredi/sudoku-board-for-teaching/wiki"
                                target="_blank"
                            >
                                Wiki
                            </a>.
                        </p>
                    </div>
                </div>
            </PageContainer>
        );
    }
}
