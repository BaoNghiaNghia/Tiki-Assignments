import React, { PureComponent } from 'react'
import Link from '../../components/Link'
import './index.css'
import { Button, ButtonOutline }  from '../../components/Button';

class GameMode extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="mode-container">
                <div className="mode-center">
                    <div className="mode-title">Select Game Mode</div>
                        <Link to='/game-play?mode=beginner'>
                            <Button label="Beginner"></Button>
                        </Link>
                        <Link to='/game-play?mode=advantaged'>
                            <Button label="Advantaged"></Button>
                        </Link>
                        <Link to='/'>
                            <ButtonOutline label="Home"></ButtonOutline>
                        </Link>
                </div>
            </div>
        )
    }
}

export default GameMode
