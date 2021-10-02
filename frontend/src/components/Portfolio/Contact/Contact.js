import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'
import axios from 'axios'
import { MdClose } from 'react-icons/md'
import validator from 'validator'

class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailSent: false,
      name: '',
      email: '',
      message: '',
      errors: [],
    }

    this.validate = this.validate.bind(this)
  }

  validate(name, email, message) {
    const errors = []

    if (name.length === 0) {
      errors.push('Your name cannot be left blank.')
    }

    if (email.length === 0) {
      errors.push('Your email cannot be left blank.')
    } else if (!validator.isEmail(email)) {
      errors.push('Please enter a valid email.')
    }

    if (message.length === 0) {
      errors.push('Please leave a message before you send.')
    }

    return errors
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, message } = this.state
    const errors = this.validate(name, email, message)
    if (errors.length > 0) {
      this.setState({errors: errors})
      return
    }


    let formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)
    
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/portfolio/contact/',
      data: formData,
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then(response => this.setState({
        emailSent: true,
        errors: [],
      }))
      .catch(error => console.error(error))
  }

  closeAlert = (e) => {
    this.setState({emailSent: false})
  }

  render() {
    return (
      <>
        <section className='section-container' id='contact'>
          <div className='section-header'>
            <h2>Contact</h2>
          </div>
          <div className='section-content mw-50 mt-50'>
            <div className={`alert-success ${this.state.emailSent ? '' : 'd-none'}`}>
              <p className='alert-message'><span>Success!</span> Your email has been sent.</p>
              <p className='alert-close'><MdClose width='24px' onClick={this.closeAlert} /></p>
            </div>
            <div className='contact-from-container'>
              <form className='contact-form' onSubmit={this.handleSubmit}>
                {this.state.errors.map(error => (
                  <p key={error} className='contact-form-error'>&#183; {error}</p>
                ))}
                <input type='text' placeholder='Your Name' name='name' onChange={e => this.setState({name: e.target.value})} />
                <input type='email' placeholder='Your Email' name='email' onChange={e => this.setState({email: e.target.value})} />
                <textarea placeholder='Your Message' rows='15' onChange={e => this.setState({message: e.target.value})} />
                <button type='submit' className='contact-form-submit'>Submit</button>
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Contact