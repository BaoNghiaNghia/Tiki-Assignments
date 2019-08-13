import { put, takeLatest, call } from "redux-saga/effects";
import { fetchMinesweeper } from "../api/TikiApi";
import { checkResponseStatus } from '../Utils'
import { levelSelectionFailed, levelSelectionSuccess } from "../reducers/GameSelectionReducer/action";
import { LEVEL_SELECTION_REQUEST } from "../reducers/GameSelectionReducer/constants";


function* levelSelectionFlow(data) {
    try {
        const { payload } = data;
        
        const response = yield call(fetchMinesweeper, payload)
        
        if (checkResponseStatus(response)) {
            yield put(levelSelectionSuccess(response.data));
        }
        return response
    } catch (error) {
        yield put (levelSelectionFailed(error))
    }
}

function* levelSelectionWatcher() {
  yield takeLatest(LEVEL_SELECTION_REQUEST, levelSelectionFlow);
}

export {
    levelSelectionWatcher
}
