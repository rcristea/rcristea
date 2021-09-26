import React from 'react'
import About from '../components/Portfolio/About/About'
import Hero from '../components/Portfolio/Hero/Hero'
import Navbar from '../components/Portfolio/Navbar/Navbar'

function Portfolio(props) {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  )
}

export default Portfolio