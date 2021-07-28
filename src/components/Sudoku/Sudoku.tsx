import React from "react";
import { CellCoordinates, CellValue, SudokuNumbers } from "../Cell/Cell";
import { CellGroup, CellGroupValues } from "../CellGroup/CellGroup";
import './Sudoku.scss';
import { SelectedCell, StoreState } from "../../reducers";
import { connect } from "react-redux";
import { setSelectedCellCoordinates, setSelectedCellValue } from "../../actions";
import { NumBar } from "../NumBar/NumBar";

export type SudokuValues = [
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues,
    CellGroupValues
];

interface SudokuProps extends SudokuStateToProps {
    values: SudokuValues;
    setSelectedCellCoordinates: typeof setSelectedCellCoordinates;
    setSelectedCellValue: typeof setSelectedCellValue;
}

interface SudokuState {
    values: SudokuValues;
}

class SudokuComponent extends React.Component<SudokuProps, SudokuState> {
    constructor(props: SudokuProps) {
        super(props);

        this.state = {
            values: props.values
        };
    }

    selectCell = (coordinates: CellCoordinates): void => {
        this.props.setSelectedCellCoordinates(coordinates);

        const value = this.state.values[coordinates.group-1][coordinates.cell-1];

        if (value === null || typeof value !== 'object') {
            this.props.setSelectedCellValue(value);
        }
    };

    selectNumber = (num: SudokuNumbers): void => {
        const selectedCell = this.props.selectedCell;

        if (!selectedCell.coordinates 
            || this.props.values[selectedCell.coordinates.group-1][selectedCell.coordinates.cell-1]) {
                
            return;
        }

        const newValues = JSON.parse(JSON.stringify(this.state.values));
        newValues[selectedCell.coordinates?.group-1][selectedCell.coordinates.cell-1] = num;

        this.setState({ values: newValues });
        this.props.setSelectedCellValue(num);
    };

    renderSudoku = () => {
        return this.state.values.map(
            (element: CellGroupValues, index: number) => {
                return <CellGroup 
                    key={index} 
                    values={element} 
                    cellOnClick={this.selectCell} 
                    group={index+1 as SudokuNumbers}
                    />;
            }
        );
    };

    render() {
        return (
            <div>
                <div className="sudoku">
                    {this.renderSudoku()}
                </div>
                <NumBar cellOnClick={this.selectNumber} />
            </div>
        );
    }
}

// @todo review if we really need these states added
interface SudokuStateToProps {
    selectedCell : {
        coordinates: SelectedCell;
        value: CellValue;
    };
}

const mapStateToProps = (store: StoreState): SudokuStateToProps => {
    return {
        selectedCell: store.game.selectedCell,
    };
};

export const Sudoku = connect(
    mapStateToProps, { setSelectedCellCoordinates, setSelectedCellValue }
)(SudokuComponent);
