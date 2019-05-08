import React from 'react'
import PropTypes from 'prop-types'

const Profile = props => {
    const { username } = props
    return (
        <div>
            <h1>Hello @{username}!</h1>
        </div>
    )
}

Profile.propTypes = {
    username: PropTypes.string
}

export default Profile