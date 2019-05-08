import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = (props) => {
    const { logout } = props
    return (
        <div>
            <Link to="/todos">Todo Page</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}


Navbar.propTypes = {
    logout:     PropTypes.func.isRequired
}

export default Navbar