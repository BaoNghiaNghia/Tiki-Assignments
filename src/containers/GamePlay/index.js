import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { level_config } from '../../constants/index'
import { Chrome } from 'react-feather'
import Link from '../../components/Link'
import Board from '../../components/Board';
import {
  changeDifficultyRequest, toggleFlagSwitchRequest, gameOverStateRequest, clearGameRequest, levelSelectionRequest,
  initBoardRequest
} from '../../reducers/GameSelectionReducer/action';
import './index.css'
import { Button, ButtonOutline } from '../../components/Button';

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

    componentWillMount() {
      
      // Init game mode from search params
      const urlParams = new URLSearchParams(location.search);
      const gameMode = urlParams.get('mode');
      this.props.initReq(gameMode);

      // Init counter
      this.interval = [];

      this.props.fetchLevelSelection({
        size: level_config[gameMode].boardHeight,
        mines: level_config[gameMode].bombNum
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
        const { difficulty, gameover, clear, bomb } = this.props;
        const { boardWidth, cellSize } = difficulty ? level_config[difficulty] : level_config['beginner']
        const boardWidthPx = boardWidth * cellSize

        let status = <span className="status"></span>

        if (gameover) {
            status = <span id="gameover" className="status">Gameover</span>
        } else if (clear) {
            status = <span id="clear" className="status">Clear!</span>
        }
        
        return (
            <div className="game-container" style={{ width: boardWidthPx }}>
                <div className="button-container">
                  <Button label="New game" onClick={this.handleResetGame}></Button>
                  
                  <Link to='/'>
                    <ButtonOutline label="Home" onClick={this.handleResetGame}></ButtonOutline>
                  </Link>
                </div>
                <div className="header-container">
                    <span><Chrome size={25} style={{ marginBottom: -6}} /> {bomb}</span>
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
    toggle: (data) => dispatch(toggleFlagSwitchRequest(data)),
    gameoverReq: (data) => dispatch(gameOverStateRequest(data)),
    clearReq: (data) => dispatch(clearGameRequest(data)),
    initReq: (data) => dispatch(initBoardRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePlay)
