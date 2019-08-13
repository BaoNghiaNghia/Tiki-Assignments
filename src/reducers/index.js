import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import GameSelectionReducer from './GameSelectionReducer'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  gameSelection: GameSelectionReducer
})

export default rootReducer
