import { createBrowserHistory } from 'history'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'
import rootSaga from './sagas'
import config from './config'

export const history = createBrowserHistory()

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const reduxPersistConfig = {
  key: config.ASYNC_STORAGE_KEY,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['collection']
}

const persistedReducer = persistReducer(reduxPersistConfig, rootReducer(history))

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history)
].filter(Boolean)

const enhancer = composeSetup(applyMiddleware(...middlewares))

const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export {
  persistor,
  store
}
