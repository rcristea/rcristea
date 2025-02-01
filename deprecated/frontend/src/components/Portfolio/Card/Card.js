import React, { Component, createRef } from 'react'
import './Card.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'img': this.props.img,
      'title': this.props.title,
      'content': this.props.content,
      'footer': this.props.footer,
      'showBorder': true,
    }

    this.scrollBoxRef = createRef()
  }

  componentDidMount() {
    if (this.scrollBoxRef.scrollHeight < this.scrollBoxRef.clientHeight) {
      this.setState({'showBorder': true})
    }
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (!bottom) {
      this.setState({'showBorder': true})
    } else {
      this.setState({'showBorder': false})
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
          <div className={`card-content ${this.state.showBorder ? 'show-border' : ''}`} onScroll={this.handleScroll} ref={this.scrollBoxRef}>
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