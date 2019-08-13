import React, { PureComponent } from 'react'
import Link from '../../components/Link'
import './index.css'

class GameMode extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="mode-container">
                <div className="mode-center">
                    <div className="mode-title">Minesweeper</div>
                    <div>
                        <Link to='/game-play' className='back-icon'>
                            <span>Beginner</span>
                        </Link>
                    </div>
                    <div>
                        <Link to='/game-play' className='back-icon'>
                            <span>Advantaged</span>
                        </Link>
                    </div>
                    <div>
                        <Link to='/' className='back-icon'>
                            <span>Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameMode
