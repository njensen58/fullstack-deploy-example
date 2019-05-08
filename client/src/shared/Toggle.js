import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Toggle extends Component {
    constructor(){
        super()
        this.state = { on: false }
    }

    toggler = () => this.setState(prevState => ({ on: !prevState.on }))
    
    render(){
        return this.props.render({ on: this.state.on, toggler: this.toggler })
    }
}

Toggle.propTypes = {
    render: PropTypes.func.isRequired
}