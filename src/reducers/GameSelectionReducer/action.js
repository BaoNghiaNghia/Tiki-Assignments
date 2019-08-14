import {
    LEVEL_SELECTION_REQUEST,
    LEVEL_SELECTION_FAILED,
    LEVEL_SELECTION_SUCCESS,

    TOGGLE_FLAG_SWITCH_REQUEST,
    TOGGLE_FLAG_SWITCH_DONE,

    GAME_OVER_STATE_REQUEST,
    GAME_OVER_STATE_DONE,
    
    CLEAR_GAME_REQUEST,
    CLEAR_GAME_DONE,

    INIT_BOARD_DONE,
    INIT_BOARD_REQUEST
} from './constants'

export const levelSelectionRequest = (data) => ({
    type: LEVEL_SELECTION_REQUEST,
    payload: data
})

export const levelSelectionFailed = (error) => ({
    type: LEVEL_SELECTION_FAILED,
    payload: error
})

export const levelSelectionSuccess = (data) => ({
    type: LEVEL_SELECTION_SUCCESS,
    payload: data
})

export const toggleFlagSwitchRequest = (data) => ({
    type: TOGGLE_FLAG_SWITCH_REQUEST,
    payload: data
})

export const toggleFlagSwitchDone = (data) => ({
    type: TOGGLE_FLAG_SWITCH_DONE,
    payload: data
})

export const gameOverStateRequest = () => ({
    type: GAME_OVER_STATE_REQUEST
})

export const gameOverStateDone = () => ({
    type: GAME_OVER_STATE_DONE
})

export const clearGameRequest = () => ({
    type: CLEAR_GAME_REQUEST
})

export const clearGameDone = () => ({
    type: CLEAR_GAME_DONE
})

export const initBoardRequest = (data) => ({
    type: INIT_BOARD_REQUEST,
    payload: data
})

export const initBoardDone = () => ({
    type: INIT_BOARD_DONE
})
