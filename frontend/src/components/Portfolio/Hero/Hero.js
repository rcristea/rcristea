import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'

import { Link } from 'react-scroll'

class Hero extends Component {
  render() {
    return (
      <>
        <div className='hero' id='top'>
          <div className='container'>
            <h1>Hello, my name is <span className='color-secondary'>Ruben Cristea</span>.</h1>
            <h1>I'm a software engineer.</h1>
            <div className='spacer'></div>
            <Link
              to='about'
              className='hero-button'
              spy={true}
              smooth={true}
              offset={0}
            >Check out my stuff!</Link>
          </div>
        </div>
      </>
    )
  }
}

export default Hero