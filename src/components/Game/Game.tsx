import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import {
    setSelectedCellCoordinates,
    setSelectedCellValue,
    setGameUpdatedBoard,
    setGameSolution,
    setGameErrorCounter,
    setGameStatus,
    setPage,
    setGames
} from "../../actions";
import {
    AnnotationsType,
    CellGroupValuesType,
    CellValueType,
    GameModeType,
    GameStatusType,
    Pages,
    SelectedCellType,
    SudokuNumbersType,
    SudokuValuesType,
    Games
} from "../../types";
import {
    Infobar,
    NumBar,
    Overlay,
    Sudoku,
    Toolbar,
    TeachingTopBar
} from "../";
import { SudokuHelper, TimerHelper } from "../../utils";

const emptyAnnotations = [null, null, null, null, null, null, null, null, null];

interface GameProps extends GameStateToProps {
    gameIndex: number;
    gameType: Pages;
    setSelectedCellValue: typeof setSelectedCellValue;
    setGameUpdatedBoard: typeof setGameUpdatedBoard;
    setGameSolution: typeof setGameSolution;
    setGameErrorCounter: typeof setGameErrorCounter;
    setGameStatus: typeof setGameStatus;
    setPage: typeof setPage;
    setSelectedCellCoordinates: typeof setSelectedCellCoordinates;
    setGames: typeof setGames;
}

interface GameState {
    gameIndex: number;
    gameType: Pages;
}

class GameComponent extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        const { gameIndex, gameType } = this.props;

        this.state = {
            gameIndex,
            gameType
        };
    }

    componentDidMount() {
        const game = this.props.games.data[this.state.gameIndex];
        this.props.setGameUpdatedBoard(game.puzzle);
        this.props.setGameSolution(game.solution);
        this.props.setGameStatus(GameStatusType.On);
        this.props.setGameErrorCounter(0);
        this.props.setSelectedCellValue(null);
        this.props.setSelectedCellCoordinates(null);
    }

    selectNumber = (num: SudokuNumbersType): void => {
        if (this.props.mode !== GameModeType.Annotate) {
            this.selectNumberInNormalMode(num);
        } else {
            this.selectNumberInAnnotateMode(num);
        }
    };

    private selectNumberInNormalMode = (num: SudokuNumbersType): void => {
        const coordinates = this.props.selectedCell.coordinates;
        const game = this.props.games.data[this.state.gameIndex];

        // If no selected cell, or not an editable cell
        if (!coordinates || game.puzzle[coordinates.group - 1][coordinates.cell - 1]) {
            return;
        }

        // Update selected cell value in store
        this.props.setSelectedCellValue(num);

        // If new value does not match solution, and new value is different than previous...
        if (game.solution[coordinates.group - 1][coordinates.cell - 1] !== num
            && this.props.updatedBoard[coordinates.group - 1][coordinates.cell - 1] !== num) {

            // Update error count
            const errors = this.props.errorCounter + 1;
            this.props.setGameErrorCounter(errors);

            // If we reached max errors limit, change game status to lost
            if (this.props.maxErrors && errors >= this.props.maxErrors) {
                this.props.setGameStatus(GameStatusType.Lost);
            }
        }

        // Update board state in store
        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = num;

        // this.props.setGameUpdatedBoard(newValues);
        // Clear annotations of the same vale/number in highlight zones, then update board
        this.props.setGameUpdatedBoard(this.removeRelevantAnnotations(num, newValues));

        // Validate if the game is completed successfully
        if (JSON.stringify(newValues) === JSON.stringify(game.solution)) {
            this.props.setGameStatus(GameStatusType.Finished);
        }
    };

    private removeRelevantAnnotations = (
        num: SudokuNumbersType,
        updatedBoard: SudokuValuesType
    ): SudokuValuesType => {
        const coordinates = this.props.selectedCell.coordinates;

        return updatedBoard.map(
            (group: CellGroupValuesType, groupIndex: number): CellGroupValuesType => {

                return group.map(
                    (cell: AnnotationsType | CellValueType, cellIndex: number): (AnnotationsType | CellValueType) => {

                        if (SudokuHelper.isCellHighlighted(
                            {
                                group: (groupIndex + 1) as SudokuNumbersType,
                                cell: (cellIndex + 1) as SudokuNumbersType
                            },
                            coordinates
                        ) && Array.isArray(cell)) {

                            return cell.map((value: CellValueType, index: number): CellValueType => {

                                return index === num - 1 ? null : value;
                            }) as AnnotationsType;
                        } else {
                            return cell;
                        }
                    }
                ) as CellGroupValuesType;
            }
        ) as SudokuValuesType;
    }

    private selectNumberInAnnotateMode = (num: SudokuNumbersType): void => {
        const coordinates = this.props.selectedCell.coordinates;
        const game = this.props.games.data[this.state.gameIndex];

        // If no selected cell, or not an editable cell
        if (!coordinates || game.puzzle[coordinates.group - 1][coordinates.cell - 1]) {
            return;
        }

        const cell = this.props.updatedBoard[coordinates.group - 1][coordinates.cell - 1];
        let annotations: AnnotationsType = JSON.parse(JSON.stringify(emptyAnnotations));

        if (Array.isArray(cell)) {
            annotations = JSON.parse(JSON.stringify(cell));
        } else if (cell !== null) {
            return;
        }

        if (annotations[num - 1] === num) {
            annotations[num - 1] = null;
        } else {
            annotations[num - 1] = num;
        }

        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = annotations;

        this.props.setGameUpdatedBoard(newValues);
    };

    eraseCell = (): void => {
        const coordinates = this.props.selectedCell.coordinates;
        const game = this.props.games.data[this.state.gameIndex];

        /**
         * We do nothing is:
         * 
         * - No cell selected
         * - No value in current selected cell (can't erase if there's nothing)
         * - There's a value in the starting board at the selected cell 
         *   coordinates (not editable)
         */
        if (!coordinates
            || !this.props.updatedBoard[coordinates.group - 1][coordinates.cell - 1]
            || game.puzzle[coordinates.group - 1][coordinates.cell - 1]) {

            return;
        }

        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = null;

        this.props.setGameUpdatedBoard(newValues);
    };

    togglePauseGame = (): void => {
        let newStatus = this.props.status;

        if (newStatus === GameStatusType.Paused) {
            newStatus = GameStatusType.On;
        } else {
            newStatus = GameStatusType.Paused;
        }

        if (newStatus !== this.props.status) {
            this.props.setGameStatus(newStatus);
        }
    };

    renderPauseOverlay(): JSX.Element {
        if (this.props.status === GameStatusType.Paused) {
            return (
                <Overlay
                    text="Click anywhere to get back to the game"
                    onClick={this.togglePauseGame}
                />
            );
        }

        return <></>;
    }

    renderLostOverlay(): JSX.Element {
        if (this.props.status === GameStatusType.Lost) {
            return (
                <Overlay
                    text="You Lost :(, but don't worry, click anywhere for another chance!"
                    onClick={this.backToHome}
                />
            );
        }

        return <></>;
    }

    backToHome = (e?: Event) => {
        if (e) {
            e.preventDefault();
        }

        if (this.props.status === GameStatusType.On) {
            this.props.setGameStatus(GameStatusType.Off);
        }

        this.props.setPage(Pages.Home);

        // Remove game from list
        const games = [...this.props.games.data];
        games.splice(this.state.gameIndex, 1);
        this.props.setGames(games);
    };

    renderWinningOverlay(): JSX.Element {
        const { status, errorCounter, time } = this.props;

        if (status === GameStatusType.Finished) {
            const formattedTime = TimerHelper.formatTimer(time);

            return (
                <Overlay
                    text={`You Won! 
                        You completed the sudoku in with ${errorCounter} errors! 
                        Your total time was: ${formattedTime}
                        Click anywhere to start a new game.`}
                    onClick={this.backToHome}
                />
            );
        }

        return <></>;
    }

    render(): JSX.Element {
        return (
            <div id="game-container">
                {this.renderPauseOverlay()}
                {this.renderLostOverlay()}
                {this.renderWinningOverlay()}
                <Toolbar
                    onEraseClick={this.eraseCell}
                    onPauseClick={this.togglePauseGame}
                    gameType={this.state.gameType}
                />
                {this.state.gameType === Pages.Game ? <Infobar /> : null}
                {this.state.gameType === Pages.Teach ? <TeachingTopBar /> : null}
                <Sudoku values={this.props.games.data[this.state.gameIndex].puzzle} />
                <NumBar cellOnClick={this.selectNumber} />
            </div>
        );
    }
}

interface GameStateToProps {
    selectedCell: {
        coordinates: SelectedCellType;
        value: CellValueType;
    };
    updatedBoard: SudokuValuesType;
    errorCounter: number;
    status: GameStatusType;
    maxErrors: number;
    mode: GameModeType;
    time: Date;
    games: Games;
}

const mapStateToProps = (store: StoreState): GameStateToProps => {
    const { selectedCell, updatedBoard, errorCounter, status, mode, time } = store.game;
    return {
        selectedCell,
        updatedBoard,
        errorCounter,
        status,
        maxErrors: store.settings.maxErrors,
        mode,
        time,
        games: store.games
    };
};

export const Game = connect(
    mapStateToProps,
    {
        setSelectedCellValue,
        setGameUpdatedBoard,
        setGameSolution,
        setGameErrorCounter,
        setGameStatus,
        setPage,
        setSelectedCellCoordinates,
        setGames
    }
)(GameComponent);
