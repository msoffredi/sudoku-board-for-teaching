import React from "react";
import './Cell.scss';

export enum CellMode {
    Edit,
    Annotate
}

// 9 numbers = all possible annotations for a cell (1-9), 0 = no annotation
export type Annotations = [
    1 | null, 
    2 | null, 
    3 | null, 
    4 | null, 
    5 | null, 
    6 | null, 
    7 | null, 
    8 | null, 
    9 | null
];

export type SudokuNumbers = 1|2|3|4|5|6|7|8|9;
export type CellValue = SudokuNumbers | null;

interface CellProps {
    mode: CellMode;
    value?: CellValue;
    annotations?: Annotations | null;
    setValue: (group: SudokuNumbers, cell: SudokuNumbers) => void;
    group: SudokuNumbers;
    cell: SudokuNumbers;
}

interface CellState {
    mode: CellMode;
}

export class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);

        this.state = {
            mode: props.mode ? props.mode : CellMode.Edit,
        }
    }

    renderAnnotations() {
        if (this.props.annotations) {
            return this.props.annotations.map((element: CellValue, index: number) => {
                return <div key={index} className="annotation">{element}</div>;
            });
        }

        return null;
    }

    render() {
        let content;
        let annotationClass;

        if (this.state.mode === CellMode.Annotate) {
            content = this.renderAnnotations();
            annotationClass = ' annotations';
        } else {
            content = this.props.value;
            annotationClass = '';
        }

        return (
            <div 
                className={`cell${annotationClass}`} 
                onClick={() => this.props.setValue(this.props.group, this.props.cell)}
            >
                {content}
            </div>
            );
    }
}