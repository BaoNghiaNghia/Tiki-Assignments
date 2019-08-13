import React, { PureComponent } from 'react'
import { Flag, Chrome } from 'react-feather'
import './index.css'
import { colors } from '../../constants';

const baseStyle = {
  width: 40,
  height: 40,
  border: 'solid 1px black',
  margin: 1,
  backgroundColor: colors.mainDark,
  lineHeight: '40px',
  userSelect: 'none'
}

const openStyle = {
  width: 40,
  height: 40,
  lineHeight: '40px',
  border: 'solid 1px darkgray',
  backgroundColor: colors.mainLight,
}

const flag = {
  color: '#fff',
  marginTop: 7
}

export default class Cell extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClick = (e) => {
    const { onClick, x, y } = this.props;

    onClick(x, y)
  }

  handleDoubleClick = (e) => {
    const { onDoubleClick, x, y } = this.props;

    onDoubleClick(x, y)
  }

  handleRightClick = (e)  => {
    const { onRightClick, x, y } = this.props;
    e.preventDefault()
    onRightClick(x, y)
  }

  render() {
    const { cell, cellSize } = this.props;

    let content = cell.flagged ? <Flag style={flag} /> : ''

    let style = Object.assign({}, baseStyle, {
      width: cellSize,
      height: cellSize,
      lineHeight: `${cellSize}px`,
    })

    if (cell.open) {
      
      style = Object.assign({}, style, openStyle, {
        width: cellSize,
        height: cellSize,
        lineHeight: `${cellSize}px`
      })

      if (cell.bomb) {
        content = <Chrome style={{ marginTop: -3 }} />
        style = Object.assign({}, style, { backgroundColor: 'red' })

      } else {
        if (cell.bombCount > 0) {
          content = cell.bombCount
          style = Object.assign({}, style, { color: 'white' })
        } else {
          content = ''
        }

      }
    }
    return (
      <div
        className="cell"
        style={style}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        onContextMenu={this.handleRightClick}
      >
        {content}
      </div>
    )
  }
}
