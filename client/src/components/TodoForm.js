import React from 'react'
import PropTypes from 'prop-types'

const TodoForm = props => {
    const { handleChange, handleSubmit, inputs: { title }} = props
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                value={title} 
                onChange={handleChange} 
                placeholder="Title"/>
            <button>Add Todo</button>
        </form>
    )
}

TodoForm.propTypes = {
    handleChange:   PropTypes.func.isRequired,
    handleSubmit:   PropTypes.func.isRequired,
    inputs:         PropTypes.shape({
        title:          PropTypes.string.isRequired
    })
}

export default TodoForm