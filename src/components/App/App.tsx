import React from 'react';
import './App.scss';
import { Game } from '../.';
import { GameDataType } from '../../types';

const easy1 = [
    [null, null, null, null, 9, null, 8, 7, 2],
    [7, null, 2, null, 8, 1, 4, 5, null],
    [9, null, null, 2, null, null, null, 1, 3],
    [1, null, null, 9, null, null, null, 4, null],
    [null, 7, null, 1, null, 5, null, null, null],
    [4, 2, null, null, null, 8, 5, 6, null],
    [null, 3, 5, null, 8, null, null, null, null],
    [8, null, 4, null, 3, 6, 5, null, null],
    [null, 9, 6, 7, null, null, null, 3, 2],
];

const solutionEasy1 = [
    [5, 1, 3, 6, 9, 4, 8, 7, 2],
    [7, 6, 2, 3, 8, 1, 4, 5, 9],
    [9, 8, 4, 2, 5, 7, 6, 1, 3],
    [1, 5, 8, 9, 2, 6, 3, 4, 7],
    [6, 7, 3, 1, 4, 5, 2, 9, 8],
    [4, 2, 9, 3, 7, 8, 5, 6, 1],
    [7, 3, 5, 2, 8, 1, 4, 6, 9],
    [8, 2, 4, 9, 3, 6, 5, 1, 7],
    [1, 9, 6, 7, 4, 5, 8, 3, 2]
];

const game = {
    start: easy1,
    solution: solutionEasy1
} as GameDataType;

export class App extends React.Component {

    render(): JSX.Element {
        return (
            <main className="container-center">
                <div >
                    <h1 id="title">Sudoku board for teaching</h1>
                    <Game game={game} />
                </div>
            </main>
        );
    }
}
