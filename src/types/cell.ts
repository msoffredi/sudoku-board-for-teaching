export type SudokuNumbersType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * A calle value can be null if it's empty
 */
export type CellValueType = SudokuNumbersType | null;

// 9 numbers = all possible annotations for a cell (1-9), null = no annotation
export type AnnotationsType = [
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

export interface CellCoordinatesType {
    group: SudokuNumbersType,
    cell: SudokuNumbersType,
}

type CellGroupSolution = [
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType,
    SudokuNumbersType
];

export type SudokuSolutionType = [
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution,
    CellGroupSolution
];
