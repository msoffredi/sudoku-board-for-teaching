import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import {
    setSelectedCellValue,
    setGameUpdatedBoard,
    setGameSolution,
    setGameErrorCounter,
    setGameStatus
} from "../../actions";
import {
    AnnotationsType,
    CellGroupValuesType,
    CellValueType,
    GameDataType,
    GameModeType,
    GameStatusType,
    SelectedCellType,
    SudokuNumbersType,
    SudokuValuesType
} from "../../types";
import {
    Infobar,
    NumBar,
    Sudoku,
    Toolbar
} from "../.";
import { SudokuHelper } from "../../utils";

const emptyAnnotations = [null, null, null, null, null, null, null, null, null];

interface GameProps extends GameStateToProps {
    game: GameDataType;
    setSelectedCellValue: typeof setSelectedCellValue;
    setGameUpdatedBoard: typeof setGameUpdatedBoard;
    setGameSolution: typeof setGameSolution;
    setGameErrorCounter: typeof setGameErrorCounter;
    setGameStatus: typeof setGameStatus;
}

class GameComponent extends React.Component<GameProps> {
    componentDidMount() {
        this.props.setGameUpdatedBoard(this.props.game.start);
        this.props.setGameSolution(this.props.game.solution);
        this.props.setGameStatus(GameStatusType.On);
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

        // If no selected cell, or not an editable cell
        if (!coordinates || this.props.game.start[coordinates.group - 1][coordinates.cell - 1]) {
            return;
        }

        // Update selected cell value in store
        this.props.setSelectedCellValue(num);

        // If new value does not match solution, and new value is different than previous...
        if (this.props.game.solution[coordinates.group - 1][coordinates.cell - 1] !== num
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
        if (JSON.stringify(newValues) === JSON.stringify(this.props.game.solution)) {
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

        // If no selected cell, or not an editable cell
        if (!coordinates || this.props.game.start[coordinates.group - 1][coordinates.cell - 1]) {
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
            || this.props.game.start[coordinates.group - 1][coordinates.cell - 1]) {

            return;
        }

        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = null;

        this.props.setGameUpdatedBoard(newValues);
    };

    pauseGame = (): void => {
        let newStatus = this.props.status;

        if (newStatus === GameStatusType.On) {
            newStatus = GameStatusType.Paused;
        }

        if (newStatus !== this.props.status) {
            this.props.setGameStatus(newStatus);
        }
    };

    render(): JSX.Element {
        return (
            <div id="game-container">
                <Infobar />
                <Sudoku values={this.props.game.start} />
                <Toolbar onEraseClick={this.eraseCell} onPauseClick={this.pauseGame} />
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
}

const mapStateToProps = (store: StoreState): GameStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
        updatedBoard: store.game.updatedBoard,
        errorCounter: store.game.errorCounter,
        status: store.game.status,
        maxErrors: store.settings.maxErrors,
        mode: store.game.mode
    };
};

export const Game = connect(
    mapStateToProps,
    {
        setSelectedCellValue,
        setGameUpdatedBoard,
        setGameSolution,
        setGameErrorCounter,
        setGameStatus
    }
)(GameComponent);