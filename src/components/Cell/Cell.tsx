import React from "react";
import './Cell.scss';

enum CellMode {
    Edit,
    Annotate
}

interface CellProps {
    mode?: CellMode;
    value?: number;
    annotations?: number[];
}

export class Cell extends React.Component<CellProps> {
    constructor(props: CellProps) {
        super(props);

        this.state = {
            mode: CellMode.Edit,
        }
    }

    render() {
        return <div className="cell">{this.props.value}</div>;
    }
}