import React from "react";
import './Cell.scss';

export enum CellMode {
    Edit,
    Annotate
}

export interface CellCoordinates {
    group: SudokuNumbers,
    cell: SudokuNumbers,
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
    // setValue: (group: SudokuNumbers, cell: SudokuNumbers) => void;
    group: SudokuNumbers;
    cell: SudokuNumbers;
    cellOnClick: (coordinates: CellCoordinates) => void;
}

interface CellState {
    startingValue: CellValue;
}

export class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);

        this.state = {
            startingValue: this.props.value ? this.props.value : null,
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

    // getOnClickFunction() {
    //     if (this.state.startingValue) {
    //         return null;
    //     } else {
    //         return this.props.setValue(this.props.group, this.props.cell);
    //     }
    // }

    // @todo Add some type to return value
    getConditionalContent() {
        if (this.props.mode === CellMode.Annotate) {
            return {
                content: this.renderAnnotations(),
                annotationClass: 'annotations',
                colorClass: '',
            };
        }

        const colorClass = this.state.startingValue === null ? 'edit' : '';

        return {
            content: this.props.value,
            annotationClass: '',
            colorClass,
        };
    }

    render() {
        const { content, annotationClass, colorClass} = this.getConditionalContent();

        return (
            <div 
                className={`cell ${annotationClass} ${colorClass}`} 
                onClick={() => this.props.cellOnClick({ 
                    group: this.props.group, 
                    cell: this.props.cell,
                })}
            >
                {content}
            </div>
            );
    }
}