import { Annotations } from './components/Cell/Cell';
import './App.scss';
import { CellGroup, CellGroupValues } from './components/CellGroup/CellGroup';

function App() {
  const annotations: Annotations = [1, 2, null, null, null, 6, 7, 8, 9];
  const group = [
    1,2,3,4,5,6,7,8,annotations
  ] as CellGroupValues;

  return (
    <main>
      <div className="container-center">
        <CellGroup values={group} />
      </div>
    </main>
  );
}

export default App;
