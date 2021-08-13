import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { CellValueType, SettingsType, SudokuNumbersType, SudokuValuesType } from "../../types";
import { SudokuHelper } from "../../utils";
import './NumBar.scss';

interface NumBarProps extends NumBarStateToProps {
    cellOnClick: (num: SudokuNumbersType) => void;
}

class NumBarComponent extends React.Component<NumBarProps> {
    generateNumbers = (): JSX.Element[] => {
        const numbers: CellValueType[] = this.props.settings.hideUsedNumbers
            ? SudokuHelper.getIncompleteNumbers(this.props.updatedBoard)
            : [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return numbers.map((num: CellValueType, index: number) => {
            return num ?
                <div
                    key={index}
                    className="num-cell"
                    onClick={() => this.props.cellOnClick(num)}
                >{num}</div>
                : <div key={index} className="num-cell empty"></div>;
        });
    };

    render(): JSX.Element {
        return (
            <div id="numbar">
                {this.generateNumbers()}
            </div>
        );
    }
}

interface NumBarStateToProps {
    updatedBoard: SudokuValuesType;
    settings: SettingsType;
}

const mapStateToProps = (store: StoreState): NumBarStateToProps => {
    return {
        updatedBoard: store.game.updatedBoard,
        settings: store.settings
    };
};

export const NumBar = connect(mapStateToProps)(NumBarComponent);
