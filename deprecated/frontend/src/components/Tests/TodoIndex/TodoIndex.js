import { React, Component } from 'react'
import './TodoIndex.css'
import axios from 'axios'

class TodoIndex extends Component {
  todoItems = [
    {
      id: 1,
      title: 'Go to Market',
      description: 'Buy ingredients to prepare dinner',
      completed: true,
    }
  ]

  constructor(props) {
    super(props)

    this.state = {
      viewCompleted: false,
      todoList: this.todoItems
    }
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList = () => {
    axios.get('http://localhost:8000/api/todo/')
      .then(response => this.setState({ todoList: response.data }))
      .catch(error => console.error(error))
  }

  handleDelete = (item) => {
    axios.delete(`http://localhost:8000/api/todo/${item.id}/`)
      .then(response => this.refreshList())
      .catch(error => console.error(error))
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true })
    }

    return this.setState({ viewCompleted: false })
  }

  renderTabList = () => {
    return (
      <div>
        <span
          className={this.state.viewCompleted ? 'nav-link active' : 'nav-link'}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? 'nav-link' : 'nav-link active'}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    )

    return newItems.map((item) => (
      <li key={item.id}>
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button>Edit</button>
          <form onSubmit={this.handleDelete(item)}>
            <button type='submit'>Delete</button>
          </form>
        </span>
      </li>
    ))
  }

  render() {
    return (
      <main className='container'>
        <a href='/todo/add'>Add Todo</a>
        {this.renderTabList()}
        <ul className='list-group list-group-flush border-top-0'>
          {this.renderItems()}
        </ul>
      </main>
    )
  }
}

export default TodoIndex