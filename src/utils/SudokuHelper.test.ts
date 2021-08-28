import { SudokuHelper } from './SudokuHelper';
import { 
    finishedBoard, 
    almostFinishedBoard, 
    newGameBoard 
} from '../../mocks/sudokuBoards';
import { CellCoordinatesType, SelectedCellType, SudokuNumbersType } from '../types';

export const newCoordinate = (cell: SudokuNumbersType, group: SudokuNumbersType): CellCoordinatesType => {
    return { cell, group };
};

describe('Sudoku Helper tests', () => {
    it.each([
        // Same group
        [newCoordinate(1, 1), newCoordinate(9, 1), true],
        [newCoordinate(2, 1), newCoordinate(9, 1), true],
        [newCoordinate(3, 1), newCoordinate(9, 1), true],
        [newCoordinate(4, 1), newCoordinate(9, 1), true],
        [newCoordinate(5, 1), newCoordinate(9, 1), true],
        [newCoordinate(6, 1), newCoordinate(9, 1), true],
        [newCoordinate(7, 1), newCoordinate(9, 1), true],
        [newCoordinate(8, 1), newCoordinate(9, 1), true],
        [newCoordinate(9, 1), newCoordinate(9, 1), true],
        // Diff group
        [newCoordinate(1, 2), newCoordinate(9, 1), false],
        [newCoordinate(1, 3), newCoordinate(9, 1), false],
        [newCoordinate(1, 4), newCoordinate(9, 1), false],
        [newCoordinate(1, 5), newCoordinate(9, 1), false],
        [newCoordinate(1, 6), newCoordinate(9, 1), false],
        [newCoordinate(1, 7), newCoordinate(9, 1), false],
        [newCoordinate(1, 8), newCoordinate(9, 1), false],
        [newCoordinate(1, 9), newCoordinate(9, 1), false],
        // Same row
        [newCoordinate(9, 2), newCoordinate(9, 1), true],
        [newCoordinate(8, 2), newCoordinate(9, 1), true],
        [newCoordinate(7, 2), newCoordinate(9, 1), true],
        [newCoordinate(9, 3), newCoordinate(9, 1), true],
        [newCoordinate(8, 3), newCoordinate(9, 1), true],
        [newCoordinate(7, 3), newCoordinate(9, 1), true],
        [newCoordinate(6, 2), newCoordinate(9, 1), false],
        [newCoordinate(3, 2), newCoordinate(9, 1), false],
        [newCoordinate(6, 3), newCoordinate(9, 1), false],
        [newCoordinate(3, 3), newCoordinate(9, 1), false],

        // Same column
        [newCoordinate(3, 4), newCoordinate(9, 1), true],
        [newCoordinate(6, 4), newCoordinate(9, 1), true],
        [newCoordinate(9, 4), newCoordinate(9, 1), true],
        [newCoordinate(3, 7), newCoordinate(9, 1), true],
        [newCoordinate(6, 7), newCoordinate(9, 1), true],
        [newCoordinate(9, 7), newCoordinate(9, 1), true],
        [newCoordinate(1, 4), newCoordinate(9, 1), false],
        [newCoordinate(2, 4), newCoordinate(9, 1), false],
        [newCoordinate(1, 7), newCoordinate(9, 1), false],
        [newCoordinate(2, 7), newCoordinate(9, 1), false],
    ])('Test isCellHighlighted with cell(%o), selectedCell(%o)', (
        cell: CellCoordinatesType, 
        selectedCell: SelectedCellType,
        result: boolean
    ) => {
        expect(SudokuHelper.isCellHighlighted(cell, selectedCell)).toEqual(result);
    });

    it('Test getIncompatibleNumbers', () => {
        expect(SudokuHelper.getIncompleteNumbers(finishedBoard)).toEqual(
            [null, null, null, null, null, null, null, null, null]
        );
        expect(SudokuHelper.getIncompleteNumbers(almostFinishedBoard)).toEqual(
            [1, 2, null, null, null, null, null, null, null]
        );
        expect(SudokuHelper.getIncompleteNumbers(newGameBoard)).toEqual(
            [1, 2, 3, 4, 5, 6, 7, 8, 9]
        );
    });

    it('Test cellGroupToColRow', () => {
        expect(SudokuHelper.cellGroupToColRow(1, 9)).toEqual([7, 7]);
        expect(SudokuHelper.cellGroupToColRow(2, 5)).toEqual([5, 4]);
        expect(SudokuHelper.cellGroupToColRow(7, 1)).toEqual([1, 3]);
    });
});
