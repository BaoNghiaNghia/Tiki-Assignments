import toastr from 'toastr'

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
import { level_config } from '../../constants/index'

const initialState = {
    gameover: false,
    clear: false,
    bomb: '',
    difficulty: '',
    data: [],
    isLoading: false,
    size: 0,
    mines: 0,
    error: undefined
}

export default (state = initialState, action) => {

    let data
  
    switch (action.type) {
      case LEVEL_SELECTION_REQUEST: {
        return {
          ...state,
          isLoading: true,
          error: undefined
        }
      }
      case LEVEL_SELECTION_SUCCESS: {
        data = action.payload

        if (data) {
          return {
            ...state,
            data: data,
            isLoading: false,
            error: undefined
          }
        }
      }

      case LEVEL_SELECTION_FAILED: {
        data = action.payload
        toastr.error('Fetch Failed')
        return {
          ...state,
          isLoading: false,
          error: data
        }
      }

      case TOGGLE_FLAG_SWITCH_REQUEST: {
        return {
            ...state,
            isLoading: true,
            error: undefined
        }
      }

      case TOGGLE_FLAG_SWITCH_DONE: {
        data = action.payload
        let { bomb } = state

        if (data) {
          bomb -= 1
        } else {
          bomb += 1
        }

        return Object.assign({}, ...state, {
            bomb,
            isLoading: false,
            error: undefined
        })
      }

      case GAME_OVER_STATE_REQUEST: {
        return {
          ...state,
          gameover: true,
          isLoading: false,
          error: undefined
        }
      }

      case GAME_OVER_STATE_DONE: {
        
        return {
          ...state,
          isLoading: true,
          error: undefined
        }
      }

      case CLEAR_GAME_REQUEST: {
        return {
            ...state,
            isLoading: true,
            error: undefined
        }
      }
      
      case CLEAR_GAME_DONE: {
        return Object.assign({}, ...state, {
            clear: true,
            isLoading: false,
            error: undefined
        })
      }

      case INIT_BOARD_REQUEST: {
        data = action.payload;
        
        return {
          ...state,
          difficulty: data,
          bomb: level_config[data].bombNum,
        }
      }

      case INIT_BOARD_DONE: {
        return {
          ...state,
          isLoading: false,
          error: undefined
        }
      }
      
      default: {
        return state
      }
    }
}
  