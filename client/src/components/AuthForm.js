import React from 'react'
import PropTypes from 'prop-types'

const AuthForm = props => {
    const { handleChange, handleSubmit, inputs: { username, password }, btnText } = props
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                value={ username }
                onChange={handleChange} 
                placeholder="Username"/>
            <input 
                type="text" 
                name="password" 
                value={ password }
                onChange={handleChange} 
                placeholder="Password"/>
            <button>{ btnText }</button>
        </form>
    )
}

AuthForm.propTypes = {
    handleChange:       PropTypes.func.isRequired,
    handleSubmit:       PropTypes.func.isRequired,
    inputs:             PropTypes.shape({
        username:           PropTypes.string.isRequired,
        password:           PropTypes.string.isRequired
    }).isRequired,
    btnText:            PropTypes.string.isRequired
}

export default AuthForm


