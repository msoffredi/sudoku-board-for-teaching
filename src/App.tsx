import { Annotations } from './components/Cell/Cell';
import './App.scss';
import { CellGroupValues } from './components/CellGroup/CellGroup';
import { Sudoku, SudokuValues } from './components/Sudoku/Sudoku';

function App() {
  const annotations: Annotations = [1, 2, null, null, null, 6, 7, 8, 9];
  const group = [
    1,2,3,4,5,6,7,8,annotations
  ] as CellGroupValues;
  const groups = [
    group,
    group,
    group,
    group,
    group,
    group,
    group,
    group,
    group,
  ] as SudokuValues;

  return (
    <main>
      <div className="container-center">
        <Sudoku values={groups} />
      </div>
    </main>
  );
}

export default App;
