import React, { PureComponent } from 'react'
import Modal from 'react-modal'

import CloseIcon from '../../assets/close.svg'
import './index.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '70vw',
    height: '80vh',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.46)'
  }
}

class CustomModal extends PureComponent {
  render () {
    const { isVisible, onClose, header, footer, children } = this.props

    return (
      <Modal
        isOpen={isVisible}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel={header}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
      >
        <div className='modal-container'>
          <div className='modal-header-container'>
            <span className='modal-header'>{header}</span>
            <CloseIcon onClick={onClose} />
          </div>
          <div className='modal-content-container'>
            {children}
          </div>
          <div className='modal-footer-container'>
            {footer}
          </div>
        </div>
      </Modal>
    )
  }
}

export default CustomModal
