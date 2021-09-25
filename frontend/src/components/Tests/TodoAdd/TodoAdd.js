import React, { Component } from 'react'

class TodoAdd extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Add not implemented yet')
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type='string' placeholder='title' name='title'/>
          <input type='string' placeholder='description' name='description' />
          <button type='submit'>Submit</button>
        </form>
      </>
    )
  }
}

export default TodoAdd