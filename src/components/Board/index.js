import React from 'react'
import Row from '../Row'
import './index.css'

const Board = ({
  board, cellSize, onClick, onDoubleClick, onRightClick, ...props
}) => {
    const renderRows = () => {
      const rows = []
      board.forEach((row, i) => {
        rows.push(
          <Row
            key={i}
            row={row}
            x={i}
            cellSize={cellSize}
            onClick={onClick}
            onRightClick={onRightClick}
            onDoubleClick={onDoubleClick}
          />
        )
      })
      return rows
    }
  
    return (
      <div className="board">
          {renderRows()}
      </div>
    )
}

export default Board

