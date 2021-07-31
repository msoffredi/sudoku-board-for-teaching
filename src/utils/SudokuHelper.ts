import { CellCoordinatesType, SelectedCellType } from "../types";

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
}
