import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        onClick = {this.props.toggleCompleted(this.props.todos.id)} 
      > 
      {this.props.todos.name} { this.props.todos.completed ? "✔" : "" } 
      </div>
    )  
  }
}
