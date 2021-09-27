import React from 'react'
import About from '../components/Portfolio/About/About'
import Hero from '../components/Portfolio/Hero/Hero'
import Navbar from '../components/Portfolio/Navbar/Navbar'
import Projects from '../components/Portfolio/Projects/Projects'

function Portfolio(props) {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </>
  )
}

export default Portfolio