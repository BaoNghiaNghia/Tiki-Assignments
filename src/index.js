import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Minesweeper from './Minesweeper.js'

ReactDOM.render(
  <BrowserRouter>
    <Minesweeper />
  </BrowserRouter>,
  document.getElementById('root')
)
