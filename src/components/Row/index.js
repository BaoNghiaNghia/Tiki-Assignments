import React from 'react'
import Cell from '../Cell'

const Row = ({
  row, x, cellSize, onClick, onDoubleClick, onRightClick
}) =>{
  const renderCells = () => {
    const cells = []
    row.forEach((cell, i) => {
      cells.push(
        <Cell
          key={i}
          cell={cell}
          x={x}
          y={i}
          cellSize={cellSize}
          onClick={onClick}
          onRightClick={onRightClick}
          onDoubleClick={onDoubleClick}
        />
      )
    })
    return cells
  }

  return (
    <div>
      {renderCells()}
    </div>
  )
}

export default Row
