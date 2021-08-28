import { SudokuValuesType } from '../src/types/sudoku';

export const finishedBoard = [
    [9,7,4,5,6,8,3,1,2],
    [6,3,5,7,1,2,9,4,8],
    [8,1,2,3,4,9,6,7,5],
    [4,5,6,2,9,7,8,3,1],
    [3,9,1,4,8,6,5,2,7],
    [2,8,7,1,5,3,9,6,4],
    [1,4,3,7,8,5,6,2,9],
    [8,5,9,2,6,3,1,7,4],
    [7,2,6,4,9,1,5,3,8]
] as SudokuValuesType;

export const almostFinishedBoard = [
    [9,7,4,5,6,8,3,null,null],
    [6,3,5,7,1,2,9,4,8],
    [8,1,2,3,4,9,6,7,5],
    [4,5,6,2,9,7,8,3,1],
    [3,9,1,4,8,6,5,2,7],
    [2,8,7,1,5,3,9,6,4],
    [1,4,3,7,8,5,6,2,9],
    [8,5,9,2,6,3,1,7,4],
    [7,2,6,4,9,1,5,3,8]
] as SudokuValuesType;

export const newGameBoard = [
    [null,7,null,null,null,8,null,null,2],
    [null,3,5,7,1,null,9,4,8],
    [8,1,2,3,null,null,null,7,null],
    [null,5,6,null,null,null,8,null,1],
    [3,9,null,null,8,null,null,null,7],
    [null,null,null,1,null,null,null,null,4],
    [null,null,null,null,8,5,null,null,null],
    [null,5,null,null,6,3,1,7,4],
    [7,null,null,null,null,null,5,3,null]
] as SudokuValuesType;
