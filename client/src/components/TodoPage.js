import React, { Component } from 'react'
import Form from '../shared/Form.js'
import TodoForm from './TodoForm.js'
import { withUser } from '../context/UserProvider.js'
import PropTypes from 'prop-types'

class TodoPage extends Component {
    componentDidMount(){
        // Get user's Todos on page load
        this.props.getUserTodos()
    }

    render(){
        const { addTodo, todos } = this.props
        return (
            <div>
                <Form 
                    inputs={{ title: "" }}
                    submit={inputs => addTodo(inputs)}
                    render={formProps => <TodoForm {...formProps}/>}
                />
                { todos.map(todo => <h1 key={todo._id}>{todo.title}</h1>) }
            </div>
        )
    }
}

TodoPage.propTypes = {
    getUserTodos:   PropTypes.func.isRequired,
    addTodo:        PropTypes.func.isRequired,
    todos:          PropTypes.arrayOf(PropTypes.shape({
        title:          PropTypes.string.isRequired,
        _id:            PropTypes.string.isRequired,
        user:           PropTypes.string.isRequired
    }))
}

export default withUser(TodoPage)