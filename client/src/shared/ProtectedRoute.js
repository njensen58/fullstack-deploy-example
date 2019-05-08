import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = props => {
    const { token, component: Component, path, redirectTo, ...rest} = props
    return (
        token ?
            <Route path={path} render={rProps => <Component {...rProps} {...rest}/>} />
        :
            <Redirect to={redirectTo}/>
    )
}

ProtectedRoute.propTypes = {
    token:          PropTypes.string.isRequired,
    component:      PropTypes.func.isRequired,
    path:           PropTypes.string.isRequired,
    redirectTo:     PropTypes.string.isRequired,
    rest:           PropTypes.array
}

export default ProtectedRoute