import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'img': this.props.img,
      'title': this.props.title,
      'content': this.props.content,
      'footer': this.props.footer,
    }
  }

  render() {
    return (
      <>
        <div className='card'>
          <div className='card-header'>
            <div className='card-header-img'>
              {this.state.img}
            </div>
            <div className='card-header-title'>
              <h3>{this.state.title}</h3>
            </div>
          </div>
          <div className='card-content'>
            {this.state.content}
          </div>
          <div className='card-footer'>
            {this.state.footer}
          </div>
        </div>
      </>
    )
  }
}

export default Card