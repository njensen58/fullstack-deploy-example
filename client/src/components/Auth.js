import React from 'react'
import AuthForm from './AuthForm.js'
import Form from '../shared/Form.js'
import Toggle from '../shared/Toggle.js'
import PropTypes from 'prop-types'
import { withUser } from '../context/UserProvider.js'


const Auth = (props) => {
    const { signup, login, authErr } = props
    return (
        <div>
            <Toggle render={({on, toggler}) => 
             !on ?
                <>
                    <Form 
                        inputs={{ username: "", password: "" }}
                        submit={inputs => signup(inputs)}
                        render={formProps => <AuthForm {...formProps} btnText="Sign Up"/>}
                    />
                    <p style={{ color: "red" }}>{authErr}</p>
                    <p onClick={toggler}>Already a member?</p>
                </>
              :  
                <>
                    <Form 
                        inputs={{ username: "", password: "" }}
                        submit={inputs => login(inputs)}
                        render={formProps => <AuthForm {...formProps} btnText="Login"/>}
                    />
                    <p style={{ color: "red" }}>{authErr}</p>
                    <p onClick={toggler}>Not a member?</p>
                </>
            }/>
        </div>
    )
}

Auth.propTypes = {
    authErr:        PropTypes.string.isRequired,
    signup:         PropTypes.func.isRequired,
    login:          PropTypes.func.isRequired,
}

export default withUser(Auth)