import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

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
      completed: true,
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
      this.setState({ ...this.setState, todos: this.state.todos.concat(res.data.data)})
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

  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
    .then( res => {
      this.setState ({ ...this.state, todos: this.state.todos.map( td => {
        if (td.id !== id ) return td 
        return res.data.data
      })})
    })
    .catch( this.setAxiosError )
  }

  toggleclearcompleted = () => {
    this.setState({...this.state, completed:!this.state.completed})
  }


  componentDidMount () {
    this.fetchTodos()
  }


  render() {
    return (
      <div>
        <div id="error" > { this.state.error } </div>

        <TodoList
          todos={this.state.todos}
          completed={this.state.completed}
          toggleCompleted={this.toggleCompleted}
        />

         <Form
          onSubmitTodoForm={this.onSubmitTodoForm}
          todoNameInput={this.state.todoNameInput}
          onChangetodoNameInput={this.onChangetodoNameInput}
          toggleclearcompleted={this.toggleclearcompleted}
          completed={this.state.completed}
         />
      </div>
    )
  }
}
