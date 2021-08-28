import { SudokuHelper } from './SudokuHelper';
import { finishedBoard, almostFinishedBoard, newGameBoard } from '../../mocks/sudokuBoards';

describe('Sudoku Helper tests', () => {
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
});
