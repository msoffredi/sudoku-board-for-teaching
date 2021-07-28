import React from "react";
import { Annotations, Cell, CellCoordinates, CellMode, CellValue, SudokuNumbers } from "../Cell/Cell";
import './CellGroup.scss';

export type CellGroupValues = [
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue),
    (Annotations|CellValue)
];

interface CellGroupProps {
    values: CellGroupValues;
    group: SudokuNumbers;
    cellOnClick: (coordinates: CellCoordinates) => void;
}

export class CellGroup extends React.Component<CellGroupProps> {

    renderGroup() {
        return this.props.values.map(
            (element: Annotations|CellValue, index: number) => {
                let mode;
                let value = null;
                let annotations = null;

                if (typeof element == 'object' && Array.isArray(element)) {
                    mode = CellMode.Annotate;
                    annotations = element;
                } else {
                    mode = CellMode.Edit;
                    value = element;
                }
            
                return <Cell 
                    key={index} 
                    mode={mode} 
                    value={value} 
                    annotations={annotations} 
                    group={this.props.group}
                    cell={index+1 as SudokuNumbers}
                    cellOnClick={this.props.cellOnClick}
                    />
            });
    }

    render() {
        return <div className="cell-group">{this.renderGroup()}</div>;
    }
}
