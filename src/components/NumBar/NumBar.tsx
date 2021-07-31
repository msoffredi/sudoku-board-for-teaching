import React from "react";
import { SudokuNumbersType } from "../../types";
import './NumBar.scss';

interface NumBarProps {
    cellOnClick: (num: SudokuNumbersType) => void;
}

export class NumBar extends React.Component<NumBarProps> {
    generateNumbers = (): JSX.Element[] => {
        const numbers: SudokuNumbersType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return numbers.map((num: SudokuNumbersType, index: number) => {
            return (
                <div
                    key={index}
                    className="num-cell"
                    onClick={() => this.props.cellOnClick(num)}
                >{num}</div>
            );
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
