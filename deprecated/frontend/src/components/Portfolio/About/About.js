import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'

class About extends Component {
  render() {
    return (
      <>
        <section className='section-container' id='about'>
          <div className='section-header'>
            <h2>About</h2>
          </div>
          <div className='section-content mw-50'>
            <p>I am a fourth year student at the University of Georgia, studying Computer Science with an emphasis on Artificial Intelligence</p>
            <p>I work as a software engineer for <a href='https://carcareers.com/' target='_blank' rel='noreferrer'>a startup </a> and a tech lead for <a href='https://imperia.supply/' target='_blank' rel='noreferrer'> a fashion company</a>.</p>
            <p>I love to write code and work on all types of projects!</p>
          </div>
        </section>
      </>
    )
  }
}

export default About