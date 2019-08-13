import React, { PureComponent } from 'react'
import Link from '../../components/Link'
import './index.css'
import Button from '../../components/Button';

class WelcomeScreen extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="mode-container">
                <div className="mode-center">
                    <div className="mine-sweeper">Minesweeper</div>
                    
                    <Link to='/game-mode' className='start-icon'>
                        <Button label="Start game"></Button>
                    </Link>
                </div>
            </div>

        )
    }
}

export default WelcomeScreen
