import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/Spinner'
import { history, store, persistor } from './reduxStorage'
import routes from './routes'
import './styles/index.scss'

class Minesweeper extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<Spinner />}
        >
          <ConnectedRouter history={history}>
            <Switch history={history}>
              {
                routes && routes.map(route => (
                  <Route
                    key={route.key}
                    exact={route.exact}
                    path={route.path}
                    render={route.render} />
                ))
              }
            </Switch>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default hot(Minesweeper)
