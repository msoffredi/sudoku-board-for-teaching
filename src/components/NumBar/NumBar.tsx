import React from "react";
import { SudokuNumbers } from "../Cell/Cell";
import './NumBar.scss';

interface NumBarProps {
    cellOnClick: (num: SudokuNumbers) => void;
}

export class NumBar extends React.Component<NumBarProps> {
    generateNumbers = (): JSX.Element[] => {
        const numbers: SudokuNumbers[] = [1,2,3,4,5,6,7,8,9];
        return numbers.map((num: SudokuNumbers, index: number) => {
            return (
                <div 
                    key={index} 
                    className="num-cell" 
                    onClick={() => this.props.cellOnClick(num)}
                >{num}</div>);
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
