import React from 'react'

import GamePlay from './containers/GamePlay'
import WelcomeScreen from './containers/Welcome'

const routes = [
  {
    key: 'welcome',
    exact: true,
    path: '/',
    render: (props) => <WelcomeScreen {...props} />
  },
  {
    key: 'game-play',
    exact: true,
    path: '/game-play',
    render: (props) => <GamePlay {...props} />
  }
]

export default routes
