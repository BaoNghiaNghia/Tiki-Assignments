import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { level_config } from '../../Utils'
import { Chrome } from 'react-feather'
import Board from '../../components/Board';
import { changeDifficultyRequest, initBoardRequest, toggleFlagSwitchRequest, gameOverStateRequest, clearGameRequest, levelSelectionRequest } from '../../reducers/GameSelectionReducer/action';
import './index.css'

class GamePlay extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
          board: [],
          size: 9,
          mines: 10,
          time: 0
        }
    }

    async componentWillMount() {
      const { size, mines } = this.state;
      this.interval = [];

      await this.props.fetchLevelSelection({
        size,
        mines
      })
    }

    componentWillReceiveProps(nextProps){
      const { bombPlaces, difficulty } = nextProps
      
      if(bombPlaces) {
        
        const board = this.initBoard(difficulty, bombPlaces)
        this.setState({ board })
      }

    }

    setInterval = (fn, t) => {
      this.intervals.push(setInterval(fn, t));
    };

    initBoard = (level, bombPlaces ) => {
        const { boardWidth, boardHeight } = level_config[level]

        const board = Array.from(
          new Array(boardWidth), () => new Array(boardHeight).fill(
            { bomb: false, bombCount: 0, open: false, flagged: false }
          )
        )

        for (let place of bombPlaces) {
          board[place.x][place.y] = Object.assign({}, board[place.x][place.y], { bomb: true })
        }

        return board
    }
    
    handleResetGame = (e) => {
        const { difficulty, bombPlaces } = this.props
        const { size, mines } = this.state;
        this.props.fetchLevelSelection({
          size,
          mines
        }, () => {
          this.setState({
            board: this.initBoard(difficulty, bombPlaces)
          })
        })
    }
    
    handleClickCell = (x, y) => {
        const { gameover, clear } = this.props
        console.log('gameover nè', gameover)
        if (gameover || clear) {
          return
        }
        this.open(x, y)
    }
    
    handleRightClickCell = (x, y) => {
        const { gameover, clear } = this.props
        if (gameover || clear) {
          return
        }
        this.handleToggleFlag(x, y)
    }
    
    handleDoubleClickCell = (x, y) => {
      const { gameover, clear, difficulty } = this.props
      const { boardWidth, boardHeight } = level_config[difficulty]
      const { board } = this.state
      if (gameover || clear) {
        return
      }
      if (!board[x][y].open) {
        return
      }
  
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if ((i < 0 || i >= boardWidth) ||
              (j < 0 || j >= boardHeight) ||
              (i === x && j === y) ||
              (board[i][j].flagged)) {
            continue
          }
          this.open(i, j)
        }
      }
    }
    
    changeDifficulty = (e) => {
        const { value } = e.target
        const { bombPlaces } = this.props

        this.props.changeDifficultyReq(value)

        let newSize = level_config[value].boardHeight
        let newMines = level_config[value].bombNum

        this.setState({
          size: newSize,
          mines: newMines
        }, () => {
          this.props.fetchLevelSelection({
            size: newSize,
            mines: newMines
          })
        })


        this.setState({ 
          board: this.initBoard(value, bombPlaces) 
        })
    }
    
    open = (x, y) => {
        const { board } = this.state;
        const { difficulty } = this.props;

        const newBoard = [].concat(board)
        const { boardWidth, boardHeight } = level_config[difficulty]
        if (!newBoard[x][y].open) {
          let bombCount = 0
          for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
              if ((i < 0 || i >= boardWidth) ||
                  (j < 0 || j >= boardHeight) ||
                  (i === x && j === y)) {
                continue
              }
              if (newBoard[i][j].bomb) {
                bombCount++
              }
            }
          }
          newBoard[x][y] = Object.assign({}, newBoard[x][y], { open: true, bombCount: bombCount })

          this.setState({ board: newBoard })

          if (newBoard[x][y].flagged) {
            this.handleToggleFlag(x, y)
          }
          if (newBoard[x][y].bomb) {

            this.props.gameoverReq()
          }
          if (this.handleClear(newBoard)) {
            this.props.clearReq()
          }
    
          if (bombCount === 0 && !newBoard[x][y].bomb) {
            for (let i = x - 1; i <= x + 1; i++) {
              for (let j = y - 1; j <= y + 1; j++) {
                if ((i < 0 || i >= boardWidth) ||
                    (j < 0 || j >= boardHeight) ||
                    (i === x && j === y) ||
                    (newBoard[i][j].flagged)) {
                  continue
                }
                this.open(i, j)
              }
            }
          }
        }
    }
    
    handleClear = (board) => {
        let openCount = 0
        const { difficulty} = this.props
        const { boardWidth, boardHeight, bombNum } = level_config[difficulty]

        // this.intervals.map(clearInterval);

        board.forEach((row, i) => {
          row.forEach((cell, i) => {
            if (cell.open) {
              openCount++
            }
          })
        })
        return openCount === (boardWidth * boardHeight - bombNum)
    }
    
    handleToggleFlag = (x, y) => {
        const { board } = this.state;
      
        const newBoard = [].concat(board)
        const { flagged } = newBoard[x][y]

        newBoard[x][y] = Object.assign({}, newBoard[x][y], { flagged: !flagged })

        this.setState({
          board: newBoard
        })

        this.props.toggle(!flagged)
    }

    render() {
        const { board } = this.state;
        const { difficulty, gameover, clear, bomb } = this.props
        const { boardWidth, cellSize } = level_config[difficulty]
        const boardWidthPx = boardWidth * cellSize

        let status = <span className="status"></span>

        if (gameover) {
            status = <span id="gameover" className="status">Gameover</span>
        } else if (clear) {
            status = <span id="clear" className="status">Clear!</span>
        }
        
        return (
            <div id="game" style={{ width: boardWidthPx }}>
                <h1>Minesweeper</h1>
                <div id="menu">
                    <button onClick={this.handleResetGame} id="restart">
                        Restart
                    </button>

                    <select value={difficulty} onChange={(e) => this.changeDifficulty(e)} style={{ marginRight: 5 }}>
                        <option value={'beginner'} key={'beginner'}>Beginner</option>
                        <option value={'advantaged'} key={'advantaged'}>Advantaged</option>
                    </select>
                    <span><Chrome size={16} style={{ marginBottom: -2, marginLeft: 15}} /> {bomb}</span>
                    {status}
                </div>
                <Board
                    board={board}
                    cellSize={cellSize}
                    onClick={this.handleClickCell}
                    onRightClick={this.handleRightClickCell}
                    onDoubleClick={this.handleDoubleClickCell}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    bombPlaces: state.gameSelection.data,
    difficulty: state.gameSelection.difficulty,
    gameover: state.gameSelection.gameover,
    clear: state.gameSelection.clear,
    bomb: state.gameSelection.bomb,
})
const mapDispatchToProps = dispatch => ({
    fetchLevelSelection: (data) => dispatch(levelSelectionRequest(data)),
    changeDifficultyReq: (data) => dispatch(changeDifficultyRequest(data)),
    toggle: (data) => dispatch(toggleFlagSwitchRequest(data)),
    gameoverReq: (data) => dispatch(gameOverStateRequest(data)),
    clearReq: (data) => dispatch(clearGameRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlay)
