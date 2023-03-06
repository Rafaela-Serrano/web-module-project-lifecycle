import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      todos: [],
      //render a error from catch 
      error: "",
      //POST 
      todoNameInput:"",
    }
  }

  onChangetodoNameInput = e => {
    const {value} = e.target
    //debugger
    this.setState ({...this.state, todoNameInput:value })
  }

  resetForm = () => {
    this.setState ({...this.state, todoNameInput:""})
  }

  setAxiosError = err => {
    this.setState ({ ...this.state, error:err.response.data.message })
  }

  onSubmitTodoForm = e => {
    e.preventDefault(),
    this.postTodos()   
  }

  postTodos = () => {
    axios.post( URL, {name:this.state.todoNameInput} )
    .then(res => {
      this.fetchTodos()
      this.resetForm()
    })
    .catch( this.setAxiosError )
  }

  fetchTodos = () => {
    axios.get(URL)
    .then ( res => {
      // debugger
      this.setState ({ ...this.state, todos: res.data.data });
    })
    .catch ( this.setAxiosError )
  }

  componentDidMount () {
    this.fetchTodos()
  }


  render() {
    return (

      <div>

        <div id="error" > { this.state.error } </div>

        <div id="todos" >
          <h2>Todos:</h2>
          {

          this.state.todos.map ( (todo) => (<div key={todo.id}> {todo.name} </div>) )
          
          }
          
        </div>

        <form id="todoForm" onSubmit={this.onSubmitTodoForm}>
          <input value={this.state.todoNameInput} onChange={this.onChangetodoNameInput} type="text" placeholder="Type todo"/>
          <input type="submit"/>
          <button>Clear Completed</button>
        </form>

      </div>

    )
  }
}
