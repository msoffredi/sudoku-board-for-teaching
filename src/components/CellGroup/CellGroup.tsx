import React from "react";
import { Annotations, Cell, CellMode, CellValue } from "../Cell/Cell";
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
}

export class CellGroup extends React.Component<CellGroupProps> {
    // constructor(props: CellGroupProps) {
    //     super(props);
    // }

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
            
                return <Cell key={index} mode={mode} value={value} annotations={annotations} />
            });
    }

    render() {
        return <div className="cell-group">{this.renderGroup()}</div>;
    }
}
