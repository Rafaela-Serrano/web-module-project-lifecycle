import React from 'react'

export default class Form extends React.Component {
  render() {
  
    return (
      <div>

        <form id="todoForm" onSubmit={this.props.onSubmitTodoForm}>
          <input 
          value={this.props.todoNameInput} 
          onChange={this.props.onChangetodoNameInput} 
          type="text" 
          placeholder="Type todo"/>

          <input type="submit"/>  
        </form>

        <button onClick = {this.props.toggleclearcompleted}>
          {this.props.completed ? "Hide" : "Show" } complete 
          </button>
      </div>
    )
  }
}
