import React, { Component } from 'react'
import '../../../assets/css/portfolio.css'

class Contact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    alert('test')
  }

  render() {
    return (
      <>
        <section className='section-container' id='contact'>
          <div className='section-header'>
            <h2>Contact</h2>
          </div>
          <div className='section-content mw-50 mt-50'>
            <div className='contact-from-container'>
              <form className='contact-form' onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Your Name' name='name'/>
                <input type='email' placeholder='Your Email' name='email' />
                <textarea placeholder='Your Message' rows='15' />
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