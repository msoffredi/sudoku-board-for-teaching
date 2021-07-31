export interface SettingsType {
    /**
     * When set to true, numbers completed with all 9 of them in the sudoku 
     * board will be hidden from the numbers bar.
     */
    hideUsedNumbers: boolean;

    /**
     * When set to true, when selecting a cell with a value (a number), all 
     * numbers of the same value will be highlighted on the board.
     * 
     * This also applies to empty cell selected, if we add a new value then 
     * you are in a selected cell with a value, so the above applies.
     */
    highlightIdenticalNumbers: boolean;

    /**
     * When set to true, when selecting a cell with a value (a number), 
     * all cell on same roow, on same column, and on same group (9x9) are 
     * also highlighted.
     */
    highlightAreas: boolean;
}
