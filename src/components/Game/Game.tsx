import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import {
    setSelectedCellValue,
    setGameUpdatedBoard,
    setGameSolution,
    setGameErrorCounter
} from "../../actions";
import {
    CellValueType,
    GameDataType,
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

interface GameProps extends GameStateToProps {
    game: GameDataType;
    setSelectedCellValue: typeof setSelectedCellValue;
    setGameUpdatedBoard: typeof setGameUpdatedBoard;
    setGameSolution: typeof setGameSolution;
    setGameErrorCounter: typeof setGameErrorCounter;
}

class GameComponent extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props);

        this.props.setGameUpdatedBoard(props.game.start);
        this.props.setGameSolution(props.game.solution);
    }

    selectNumber = (num: SudokuNumbersType): void => {
        const coordinates = this.props.selectedCell.coordinates;

        if (!coordinates || this.props.game.start[coordinates.group - 1][coordinates.cell - 1]) {
            return;
        }

        this.props.setSelectedCellValue(num);

        if (this.props.game.solution[coordinates.group - 1][coordinates.cell - 1] !== num) {
            this.props.setGameErrorCounter(this.props.errorCounter + 1);
        }

        // Update board state in store
        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = num;

        this.props.setGameUpdatedBoard(newValues);
    };

    eraseCell = (): void => {
        console.log('Erase button clicked');
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

    render(): JSX.Element {
        return (
            <div id="game-container">
                <Infobar />
                <Sudoku values={this.props.game.start} />
                <Toolbar onEraseClick={this.eraseCell} />
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
}

const mapStateToProps = (store: StoreState): GameStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
        updatedBoard: store.game.updatedBoard,
        errorCounter: store.game.errorCounter
    };
};

export const Game = connect(
    mapStateToProps,
    {
        setSelectedCellValue,
        setGameUpdatedBoard,
        setGameSolution,
        setGameErrorCounter
    }
)(GameComponent);