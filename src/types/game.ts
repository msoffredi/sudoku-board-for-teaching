import { CellCoordinatesType } from ".";

export type SelectedCellType = CellCoordinatesType | null;

export enum GameStatusType {
    On = 'on',
    Off = 'off',
    Paused = 'paused',
    Teaching = 'teaching'
}
