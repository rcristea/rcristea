import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'
import rcristeaResume from '../../../assets/files/rcristeaResume.pdf'

class Resume extends Component {
  render() {
    return (
      <>
        <section className='section-container' id='resume'>
          <div className='section-header'>
            <h2>Resume</h2>
          </div>
          <div className='section-content mw-50'>
            <h3>Work Experience</h3>
            <h4><span className='bold'>Software Engineer | CARCAREERS.COM</span>, Aug 2020 - current</h4>
            <ul>
              <li>Startup company where I led a development team, using agile methodologies to create the web and mobile applications to product owner specifications.</li>
              <li>Created database migrations to create and update MySQL tables.</li>
              <li>Fixed broken backend checkout process using Authorize.net API where data was being lost and amount charged was incorrect.</li>
              <li>Designed and updated site wide UI to improve usability for all user roles.</li>
            </ul>
            <h4><span className='bold'>Web Developer | Imperia Supply</span>, Apr 2020 - current</h4>
            <ul>
              <li>Employed mastery of front-end languages and Liquid to design on Shopify and created user-oriented visuals and features that increased user clicks and sales.</li>
              <li>Currently leading a new project to move the application off Shopify and onto its own platform.</li>
            </ul>
            <h4><span className='bold'>Peer Tutor &amp; TA | Georgia Gwinnett College</span>, Jan 2019 - Dec 2019</h4>
            <ul>
              <li>Tutored at-risk students in programming courses that were based on Java, C#, or Python.</li>
              <li>Attended lecture and aided the professor in their programming classes.</li>
              <li>Informed students of procedures for completing in-class work and assignments, such as using agile methodologies and completing software projects.</li>
            </ul>
            <h3>Volunteer Experience</h3>
            <h4><span className='bold'>Sound Engineer | Philadelphia Romanian Church Atlanta</span>, Dec 2015 - Jan 2019</h4>
            <ul>
              <li>Worked with a small team that prepared and executed all aspects of media required for a large church service. The sound engineer focused on mixing audio live for an audience of three hundred and larger.</li>
            </ul>
            <h3>Skills</h3>
            <ul>
              <li>Substantial understanding of React, Full-Stack development, and MVC CRUD.</li>
              <li>Proficient in Git and git CLI.</li>
              <li>Knowledge with Linux/Unix, MacOS, and Windows systems.</li>
              <li>Ability to collaborate with others or work individually.</li>
            </ul>
            <div className='download-resume-container'>
              <a className='download-resume-button' href={rcristeaResume} target='_blank' rel='noreferrer'>Download my Resume</a>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Resume