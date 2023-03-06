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

  toggleCompleted = id => () => {
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

        <div id="todos" >
          <h2>Todos:</h2>
          {
          this.state.todos.reduce ( ( acc, todo) => {
            if (this.state.completed || !todo.completed ) return acc.concat(
              <div key={todo.id} onClick = {this.toggleCompleted(todo.id)} > {todo.name} {todo.completed? '✔️' :''}</div>
            )
            return acc
          }, [])
         
         }
          
        </div>

        <form id="todoForm" onSubmit={this.onSubmitTodoForm}>
          <input value={this.state.todoNameInput} onChange={this.onChangetodoNameInput} type="text" placeholder="Type todo"/>
          <input type="submit"/>  
        </form>
        <button onClick = {this.toggleclearcompleted}>{this.state.completed ? "Hide" : "Show" } complete </button>
      </div>

    )
  }
}
