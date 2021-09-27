import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'
import Card from '../Card/Card'
import { HiSearch } from 'react-icons/hi'
import { AiFillGithub } from 'react-icons/ai'


class Projects extends Component {
  constructor(props) {
    super(props)

    const projects = [
      {
        'img': <i className='devicon-laravel-plain-wordmark colored' />,
        'title': 'CARCAREERS.COM',
        'content': 
          <div>
            <p>CARCAREERS.COM is a hiring portal founded to make connections between job seekers and employers in the Auto Industry.</p>
            <p>My job essentially was to lead the development of the web application using the Laravel framework. Examples of things I worked on are the UI/UX to promote job-seeker profile completion, repaired a broken checkout system using Authorize.net, and a recorded video application feature.</p>
          </div>,
        'footer': 
          <p>
            <a href='https://carcareers.com' target='_blank' rel='noreferrer'>
              <HiSearch />
            </a>
          </p>
      }, 
      {
        'img': <i className='devicon-react-original-wordmark colored' />,
        'title': 'IMPERIA',
        'content': 
          <div>
            <p>IMPERIA is an emerging Atlanta luxury designer for both men and women. </p>
            <p>At the beginning, I designed a new UI/UX for the site that lead to an inrease in clicks and sales. Currently, I am leading a team to move the web app off of Shopify and onto its own platform. This is because we want to create mobile apps in the future to further a user's experience.</p>
          </div>,
        'footer': 
          <p>
            <a href='https://github.com/rcristea/imperia' target='_blank' rel='noreferrer'>
              <AiFillGithub />
            </a>
          </p>
      },
      {
        'img': <i className='devicon-react-original-wordmark colored' />,
        'title': 'This Website!',
        'content': 
          <div>
            <p>This portfolio was designed using ReactJS that also uses a Django backend. I used React in the past and fell in love with it so I have used it for pretty much any web app I worked on since trying it out. Django powers the backend. For this website it'll just send me an email whenever the contact form is submitted. I have future plans for this website so the database and backend were set up for that.</p>
          </div>,
        'footer': 
          <p>
            <a href='https://github.com/rcristea/imperia' target='_blank' rel='noreferrer'>
              <AiFillGithub />
            </a>
          </p>
      },
    ]

    this.state = {
      'projects': projects,
    }
  }

  render() {
    return (
      <>
        <section className='section-container' id='projects'>
          <div className='section-header'>
            <h2>Projects</h2>
          </div>
          <div className='section-content'>
            <div className='card-container'>
              {this.state.projects.map(project => (
                <Card key={project.title} img={project.img} title={project.title} content={project.content} footer={project.footer} />
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Projects