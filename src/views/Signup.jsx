import React, { Component } from 'react'
import { userService } from '../services/user.service'
import { connect } from 'react-redux'
import { spendBalance } from '../store/actions/user.actions'
export class _Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
    }
  }

  doSignup = (event) => {
    event.preventDefault()
    userService.signup(this.state.fullname)
    this.props.history.push('/')
  }

  handleFullnameChange = (event) => {
    this.setState({ fullname: event.target.value })
  }

  render() {
    return (
      <form className="signup-form" onSubmit={this.doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          value={this.state.fullname}
          placeholder="Your full name"
          onChange={this.handleFullnameChange}
        />
        <button type="submit">Signup</button>
      </form>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.contactModule.user,
})

const mapDispatchToProps = {
  spendBalance,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)
