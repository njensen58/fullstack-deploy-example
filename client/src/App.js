import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './components/Auth.js'
import TodoPage from './components/TodoPage'
import { withUser } from './context/UserProvider.js'
import Navbar from './components/Navbar.js'
import Profile from './components/Profile'
import ProtectedRoute from './shared/ProtectedRoute.js'
import PropTypes from 'prop-types'

const App = (props) => {
    const { user: {username, _id}, token, logout } = props
    return (
        <div>
            { token && <Navbar logout={logout}/> }
            <Switch>
                <Route exact path="/"  render={rProps => !token ? <Auth {...rProps}/> : <Redirect to="/todos"/>} />
                <ProtectedRoute 
                    path="/todos"
                    token={token}
                    component={TodoPage}
                    redirectTo="/"
                />
                <ProtectedRoute 
                    path="/profile"
                    token={token}
                    component={Profile}
                    redirectTo="/"
                    username={username}/>
            </Switch>
        </div>
    )
}

App.propTypes = {
    user: PropTypes.shape({
        username:    PropTypes.string.isRequired,
        _id:         PropTypes.string.isRequired
    }).isRequired,
    token:           PropTypes.string.isRequired,
    logout:          PropTypes.func.isRequired
}

export default withUser(App)