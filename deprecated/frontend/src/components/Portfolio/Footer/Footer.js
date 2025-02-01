import React, { Component } from 'react'
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai'

class Footer extends Component {
  render() {
    return (
      <>
        <div className='footer'>
          <div className='footer-content'>
            <div className='footer-logo'>
              Ruben Cristea
            </div>
            <div className='footer-links'>
              <div className='footer-icon'>
                <a href='https://github.com/rcristea' target='_blank' rel='noreferrer'>
                  <AiOutlineTwitter size='20px' color='#fff'/>
                </a>
                <a href='https://github.com/rcristea' target='_blank' rel='noreferrer'>
                  <AiFillGithub size='20px' color='#fff'/>
                </a>
                <a href='https://github.com/rcristea' target='_blank' rel='noreferrer'>
                  <AiFillLinkedin size='20px' color='#fff'/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Footer;