import React from "react";
import { PageContainer } from "../PageContainer/PageContainer";
import './About.scss';

export class About extends React.Component {
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
