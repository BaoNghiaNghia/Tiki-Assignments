import { fork } from 'redux-saga/effects'
import { levelSelectionWatcher } from './GameSelectionSaga';

export default function* rootSaga () {
  yield fork(levelSelectionWatcher)
}
