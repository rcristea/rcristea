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
      'isScrollBottom': false,
    }
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (!bottom) {
      this.setState({'isScrollBottom': false})
    } else {
      this.setState({'isScrollBottom': true})
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
          <div className={`card-content ${this.state.isScrollBottom ? '' : 'show-border'}`} onScroll={this.handleScroll}>
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