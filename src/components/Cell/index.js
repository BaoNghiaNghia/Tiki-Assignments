import React, { PureComponent } from 'react'
import { Flag, Chrome } from 'react-feather'
import './index.css'

const baseStyle = {
  width: 32,
  height: 32,
  border: 'outset 4px white',
  lineHeight: '32px',
  userSelect: 'none'
}

const openStyle = {
  width: 38,
  height: 38,
  lineHeight: '38px',
  border: 'solid 1px darkgray'
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

    let content = cell.flagged ? <Flag /> : ''
    let style = Object.assign({}, baseStyle, {
      width: cellSize - 8,
      height: cellSize - 8,
      lineHeight: `${cellSize - 8}px`,
    })
    if (cell.open) {
      style = Object.assign({}, style, openStyle, {
        width: cellSize - 2,
        height: cellSize - 2,
        lineHeight: `${cellSize - 2}px`
      })
      if (cell.bomb) {
        content = <Chrome style={{ marginTop: -3 }} />
        style = Object.assign({}, style, { backgroundColor: 'red' })
      } else {
        if (cell.bombCount > 0) {
          content = cell.bombCount
          switch (content) {
            case 1:
              style = Object.assign({}, style, { color: 'blue' })
              break
            case 2:
              style = Object.assign({}, style, { color: 'green' })
              break
            case 3:
              style = Object.assign({}, style, { color: 'red' })
              break
            case 4:
              style = Object.assign({}, style, { color: 'navy' })
              break
            case 5:
              style = Object.assign({}, style, { color: 'darkred' })
              break
            case 6:
              style = Object.assign({}, style, { color: 'deepskyblue' })
              break
            case 7:
              style = Object.assign({}, style, { color: 'navy' })
              break
            case 8:
              style = Object.assign({}, style, { color: 'gray' })
              break
            default:
              break
          }
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
