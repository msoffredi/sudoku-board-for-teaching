import './App.scss';
import { Sudoku, SudokuValues } from './components/Sudoku/Sudoku';

function App(): JSX.Element {
  // const annotations: Annotations = [1, 2, null, null, null, 6, 7, 8, 9];
  // const group = [
  //   1,2,3,4,5,6,7,8,annotations
  // ] as CellGroupValues;
  // const groups = [
  //   group,
  //   group,
  //   group,
  //   group,
  //   group,
  //   group,
  //   group,
  //   group,
  //   group,
  // ] as SudokuValues;

  const easy1 = [
    [null, null, null, null, 9, null, 8,7, 2],
    [7, null, 2, null, 8, 1, 4, 5, null],
    [9, null, null, 2, null, null, null, 1, 3],
    [1, null, null, 9, null, null, null, 4, null],
    [null, 7, null, 1, null, 5, null, null, null],
    [4, 2, null, null, null, 8, 5, 6, null],
    [null, 3, 5, null, 8, null, null, null, null],
    [8, null, 4, null, 3, 6, 5, null, null],
    [null, 9, 6, 7, null, null, null, 3, 2],
  ];

  const groups = easy1 as SudokuValues;

  return (
    <main>
      <div className="container-center">
        <Sudoku values={groups} />
      </div>
    </main>
  );
}

export default App;
