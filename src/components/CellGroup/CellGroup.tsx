import React from "react";
import {
    AnnotationsType,
    CellCoordinatesType,
    CellGroupValuesType,
    CellModeType,
    CellValueType,
    SudokuNumbersType
} from "../../types";
import { Cell } from "../.";
import './CellGroup.scss';

interface CellGroupProps {
    values: CellGroupValuesType;
    group: SudokuNumbersType;
    cellOnClick: (coordinates: CellCoordinatesType) => void;
}

export class CellGroup extends React.Component<CellGroupProps> {
    renderGroup(): JSX.Element[] {
        return this.props.values.map(
            (element: AnnotationsType | CellValueType, index: number) => {
                let mode;
                let value = null;
                let annotations = null;

                if (typeof element == 'object' && Array.isArray(element)) {
                    mode = CellModeType.Annotate;
                    annotations = element;
                } else {
                    mode = CellModeType.Edit;
                    value = element;
                }

                return <Cell
                    key={index}
                    mode={mode}
                    value={value}
                    annotations={annotations}
                    group={this.props.group}
                    cell={index + 1 as SudokuNumbersType}
                    cellOnClick={this.props.cellOnClick}
                />;
            });
    }

    render(): JSX.Element {
        return <div className="cell-group">{this.renderGroup()}</div>;
    }
}
