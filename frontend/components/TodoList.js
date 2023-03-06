import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos" >
      <h2>Todos:</h2>
      
          {
            this.props.todos.reduce ( ( acc, todo) => {
              if (this.props.completed || !todo.completed ) return acc.concat(
                <div key={todo.id} onClick = {this.props.toggleCompleted(todo.id)} > {todo.name} {todo.completed? '✔️' :''}</div>
              )
              return acc
            }, [])
           }

     </div>
    )
    
  }
}
