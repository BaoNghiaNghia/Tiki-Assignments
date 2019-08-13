import React from 'react'

import GamePlay from './containers/GamePlay'
import WelcomeScreen from './containers/Welcome'
import GameMode from './containers/GameMode';

const routes = [
  {
    key: 'welcome',
    exact: true,
    path: '/',
    render: (props) => <WelcomeScreen {...props} />
  },
  {
    key: 'game-mode',
    exact: true,
    path: '/game-mode',
    render: (props) => <GameMode {...props} />
  },
  {
    key: 'game-play',
    exact: true,
    path: '/game-play',
    render: (props) => <GamePlay {...props} />
  }
]

export default routes
