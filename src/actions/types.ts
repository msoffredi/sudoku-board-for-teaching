export enum ActionTypes {
    // Game
    SetSelectedCellCoordinates = 'SET_SELECTED_CELL_COORDINATES',
    SetSelectedCellValue = 'SET_SELECTED_CELL_VALUE',
    SetGameUpdatedBoard = 'SET_GAME_UPDATED_BOARD',
    SetGameSolution = 'SET_GAME_SOLUTION',
    SetGameErrorCounter = 'SET_GAME_ERROR_COUNTER',
    SetGameStatus = 'SET_GAME_STATUS',
    SetGameMode = 'SET_GAME_MODE',
    SetGameTime = 'SET_GAME_TIME',

    // Settings
    SetSettings = 'SET_SETTINGS',

    // Navigation
    SetPage = 'SET_PAGE',

    // Games
    LoadGames = 'LOAD_GAMES',
    SetGames = 'SET_GAMES',

    // Teaching
    SetTeachingColumn = 'SET_TEACHING_COLUMN',
    SetTeachingRow = 'SET_TEACHING_ROW'
}
