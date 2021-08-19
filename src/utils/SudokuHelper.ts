import { AnnotationsType, CellCoordinatesType, CellGroupValuesType, CellValueType, SelectedCellType, SudokuNumbersType, SudokuValuesType } from "../types";

export class SudokuHelper {
    public static isCellHighlighted(
            cell: CellCoordinatesType, 
            selectedCell: SelectedCellType
        ): boolean {

            if (selectedCell) {
                // Same group
                if (cell.group === selectedCell.group) {
                    return true;
                } 

                // Same row
                if (SudokuHelper.inSameGroupRow(cell, selectedCell) 
                    && SudokuHelper.inSameCellRowWithinAGroupRow(cell, selectedCell)) {

                    return true;
                }

                // Same column
                if (SudokuHelper.inSameGroupCol(cell, selectedCell) 
                    && SudokuHelper.inSameCellColWithinAGroupCol(cell, selectedCell)) {

                    return true;
                }
            }

            return false;
        }

    private static inSameGroupRow(
            cell: CellCoordinatesType, 
            selectedCell: CellCoordinatesType
        ): boolean {

            if (([1, 2, 3].includes(cell.group) && [1, 2, 3].includes(selectedCell.group)) 
                || ([4, 5, 6].includes(cell.group) && [4, 5, 6].includes(selectedCell.group))
                || ([7, 8, 9].includes(cell.group) && [7, 8, 9].includes(selectedCell.group))) {

                return true;
            }

            return false;
        }

    private static inSameGroupCol(
            cell: CellCoordinatesType, 
            selectedCell: CellCoordinatesType
        ): boolean {

            if (([1, 4, 7].includes(cell.group) && [1, 4, 7].includes(selectedCell.group)) 
                || ([2, 5, 8].includes(cell.group) && [2, 5, 8].includes(selectedCell.group))
                || ([3, 6, 9].includes(cell.group) && [3, 6, 9].includes(selectedCell.group))) {

                return true;
            }

            return false;
        }

    private static inSameCellRowWithinAGroupRow(
            cell: CellCoordinatesType, 
            selectedCell: CellCoordinatesType
        ): boolean {

            if (([1, 2, 3].includes(cell.cell) && [1, 2, 3].includes(selectedCell.cell)) 
                || ([4, 5, 6].includes(cell.cell) && [4, 5, 6].includes(selectedCell.cell))
                || ([7, 8, 9].includes(cell.cell) && [7, 8, 9].includes(selectedCell.cell))) {

                return true;
            }

            return false;    
        }

    private static inSameCellColWithinAGroupCol(
            cell: CellCoordinatesType, 
            selectedCell: CellCoordinatesType
        ): boolean {

            if (([1, 4, 7].includes(cell.cell) && [1, 4, 7].includes(selectedCell.cell)) 
                || ([2, 5, 8].includes(cell.cell) && [2, 5, 8].includes(selectedCell.cell))
                || ([3, 6, 9].includes(cell.cell) && [3, 6, 9].includes(selectedCell.cell))) {

                return true;
            }

            return false;    
        }

        /**
         * Given a provided board with a game in progress, this method will return
         * a list of unique sudoku numbers (1-9) that still have cells to discover 
         * (in other words that we have less than 9 of them in the entire board).
         * 
         * If a number is no longer playable/available we will returm null in its
         * position instead
         * 
         * @param board Updated board to evaluate
         */
    public static getIncompleteNumbers(board: SudokuValuesType): CellValueType[] {
        const numbersOccurrences = [0,0,0,0,0,0,0,0,0];

        board.forEach((group: CellGroupValuesType) => {
            group.forEach((cell: AnnotationsType | CellValueType) => {
                if (typeof cell === 'number' && cell) {
                    numbersOccurrences[cell-1]++;
                }
            });
        });

        return numbersOccurrences.map(
            (num: number, index: number): (SudokuNumbersType | null) => {
                return num < 9 ? index+1 as SudokuNumbersType : null;
            });
    }

    /**
     * This function will convert a cell identified by a group number and a cell number 
     * into a column, row pair of coordinates. A group is a collection of 9 cells and 
     * there should be 9 groups in a sudoku game.
     * 
     * Columns are 1-9, left to right
     * Rows are 1-9, top to bottom
     * 
     * @param cell 1-9 cell position being 1 top-left, 9 bottom-right
     * @param group 1-9 group position being 1 top-left, 9 bottom-right
     * 
     * @returns Array with 2 elements: column and row coordinates of the cell
     */
    public static cellGroupToColRow(
        cell: SudokuNumbersType, 
        group: SudokuNumbersType
    ): [SudokuNumbersType, SudokuNumbersType] {
        
        /**
         *  c6 g5 => c6 r5
         * 
         *  row = Math.floor((g-1)/3)*3 + Math.floor((c-1)/3) + 1
         *  row = 3 + 1 + 1
         * 
         * 
         *  col = ((g-1)%3)*3 + (c-1)%3 + 1
         *  col = ((5-1)%3)*3 + (6-1)%3 + 1
         *  col = 3 + 2 + 1 = 6
         * 
         *  c2 g6 => c8 r4
         *  col = 6 + 1 + 1 = 8
         *  row = 3 + 0 + 1 = 4
         */ 
        return [
            ((group-1)%3)*3 + (cell-1)%3 + 1 as SudokuNumbersType,
            Math.floor((group-1)/3)*3 + Math.floor((cell-1)/3) + 1 as SudokuNumbersType
        ];
    }
}
