import React, { Component } from 'react'
import { Link } from 'react-scroll'

import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai'

class Navbar extends Component {
  render() {
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-left'>
            <div className='logo'>
              <Link
                to='top'
                className='logo'
                spy={true}
                smooth={true}
                offset={0}
              >Ruben Cristea</Link>
            </div>
          </div>
          <div className='navbar-center'>
            <Link
              to='about'
              activeClass='navlink-active'
              className='navlink'
              spy={true}
              smooth={true}
              offset={0}
            >About</Link>
            <Link
              to='projects'
              activeClass='navlink-active'
              className='navlink'
              spy={true}
              smooth={true}
              offset={0}
            >Projects</Link>
            <Link
              to='resume'
              activeClass='navlink-active'
              className='navlink'
              spy={true}
              smooth={true}
              offset={0}
            >Resume</Link>
            <Link
                to='contact'
                className='navlink contact'
                spy={true}
                smooth={true}
                offset={0}
              >Contact</Link>
          </div>
          <div className='navbar-right'>
            <div className='navbar-icon'>
              <a href='https://twitter.com/Teksiti' target='_blank' rel='noreferrer'><AiOutlineTwitter color='#ffffff'/></a>
            </div>
            <div className='navbar-icon'>
              <a href='https://github.com/rcristea' target='_blank' rel='noreferrer'><AiFillGithub color='#ffffff'/></a>
            </div>
            <div className='navbar-icon'>
              <a href='https://www.linkedin.com/in/rubencristea/' target='_blank' rel='noreferrer'><AiFillLinkedin color='#ffffff'/></a>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar
