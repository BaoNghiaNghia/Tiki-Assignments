import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class LinkComponent extends React.Component {
  hanldeClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (this.props.onClick) {
    this.props.onClick()
    }
  }
  render () {
    const { to, children, className } = this.props
    return (
        <Link className="text-link" onClick={this.hanldeClick} to={to}>{children}</Link>
    )
  }
}

export default LinkComponent
