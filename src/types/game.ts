import { CellCoordinatesType } from ".";

export type SelectedCellType = CellCoordinatesType | null;

export enum GameStatusType {

    /**
     * Means a game is on
     */
    On = 'on',

    /**
     * Means the game if off (no functionality enabled)
     * (unused)
     */
    Off = 'off',

    /**
     * Means game is paused, timer paused, game functionality blocked
     */
    Paused = 'paused',

    /**
     * Means board/game is in teachign mode. This mode disables game-related
     * features and enables teaching-related ones.
     * (unused)
     */
    Teaching = 'teaching',

    /**
     * Means the game is over due to too many errors.
     */
    Lost = 'lost',

    /**
     * Means the game is over and you won.
     */
    Finished = 'finished'
}
