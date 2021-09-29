import React from 'react'
import About from '../components/Portfolio/About/About'
import Hero from '../components/Portfolio/Hero/Hero'
import Navbar from '../components/Portfolio/Navbar/Navbar'
import Projects from '../components/Portfolio/Projects/Projects'
import Resume from '../components/Portfolio/Resume/Resume'
import Contact from '../components/Portfolio/Contact/Contact'

function Portfolio(props) {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
    </>
  )
}

export default Portfolio