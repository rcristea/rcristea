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
            <a href='https://github.com/rcristea/rcristea' target='_blank' rel='noreferrer'>
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
      {
        'img': <i className='devicon-csharp-plain colored' />,
        'title': 'BasicLoginApplication',
        'content': 
          <div>
            <p>My first application to test user input validation, persistent data, database usage, and data encryption.</p>
            <p>I created this application after I was a teaching assistant in a business class that taught business majors how to write code. I didn't have any experience with C# or .NET before assisting in that class, so this was a fun way to test what I learned from that experience.</p>
          </div>,
        'footer': 
          <p>
            <a href='https://github.com/rcristea/BasicLoginApplication' target='_blank' rel='noreferrer'>
              <AiFillGithub />
            </a>
          </p>
      },
      {
        'img': <i className='devicon-python-plain-wordmark colored' />,
        'title': 'Prelaunch Previews',
        'content': 
          <div>
            <p>This was the very first project I made that I thought had real world value! It scraped a website for data about upcoming rocket launch events from various Launch Service Providers, and created google calendar events. I had this app running on a RaspberryPi that scheduled it to run once every day to update my Google Calendar with the events. This one was a lot of fun to make but unfortunately it no longer works since the website was updated and the regex I wrote no longer applies.</p>
          </div>,
        'footer': 
          <p>
            <a href='https://github.com/rcristea/prelaunch_previews_for_google_calendar' target='_blank' rel='noreferrer'>
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