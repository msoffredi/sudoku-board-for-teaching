import React from "react";
import { connect } from "react-redux";
import { SelectedCell, StoreState } from "../../reducers";
import { CellValue, SudokuNumbers } from "../Cell/Cell";
import { NumBar } from "../NumBar/NumBar";
import { Sudoku, SudokuValues } from "../Sudoku/Sudoku";
import { setSelectedCellValue, setGameUpdatedBoard, setGameSolution } from "../../actions";

type CellGroupSolution = [
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers,
    SudokuNumbers
];

export type SudokuSolution = [
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution
];

export interface GameData {
    start: SudokuValues;
    solution: SudokuSolution;
}

interface GameProps extends GameStateToProps {
    game: GameData;
    setSelectedCellValue: typeof setSelectedCellValue;
    setGameUpdatedBoard: typeof setGameUpdatedBoard;
    setGameSolution: typeof setGameSolution;
}

class GameComponent extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props);

        this.props.setGameUpdatedBoard(props.game.start);
        this.props.setGameSolution(props.game.solution);
    }

    selectNumber = (num: SudokuNumbers): void => {
        const coordinates = this.props.selectedCell.coordinates;

        if (!coordinates || this.props.game.start[coordinates.group - 1][coordinates.cell - 1]) {
            return;
        }

        this.props.setSelectedCellValue(num);

        const newValues = JSON.parse(JSON.stringify(this.props.updatedBoard));
        newValues[coordinates.group - 1][coordinates.cell - 1] = num;

        this.props.setGameUpdatedBoard(newValues);
    };

    render(): JSX.Element {
        return (
            <div>
                <Sudoku values={this.props.game.start} />
                <NumBar cellOnClick={this.selectNumber} />
            </div>
        );
    }
}

interface GameStateToProps {
    selectedCell: {
        coordinates: SelectedCell;
        value: CellValue;
    };
    updatedBoard: SudokuValues;
}

const mapStateToProps = (store: StoreState): GameStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
        updatedBoard: store.game.updatedBoard
    };
};

export const Game = connect(
    mapStateToProps,
    {
        setSelectedCellValue,
        setGameUpdatedBoard,
        setGameSolution
    }
)(GameComponent);