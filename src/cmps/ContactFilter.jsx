import React, { Component } from 'react'
import { Transcript } from './Transcript'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
export class ContactFilter extends Component {
  state = {
    filterBy: null,
    // loggedinUser: userService.getLoggedinUser(),
  }

  componentDidMount() {
    this.setState({ filterBy: { ...this.props.filterBy } })
    window.addEventListener('transcript', this.handleTranscript)
  }
  componentWillUnmount() {
    window.removeEventListener('transcript', this.handleTranscript)
  }

  // get user() {
  //   return this.loggedinUser.name
  // }
  handleTranscript = (event) => {
    const text = event.detail
    const field = 'name'
    this.setState(
      ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: text } }),
      () => {
        this.props.onChangeFilter(this.state.filterBy)
      }
    )
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    this.setState(
      ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }),
      () => this.props.onChangeFilter(this.state.filterBy)
    )
  }

  render() {
    if (!this.state.filterBy) return <div className="loader"></div>
    const { name, phone } = this.state.filterBy
    return (
      <>
        <Transcript></Transcript>

        <form className="contact-filter">
          <Link className="add-contact-link" to="/contact/edit">
            Add contact
          </Link>
          <section>
            <fieldset>
              <legend htmlFor="name">Name</legend>

              <input
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                id="my-input"
              />
            </fieldset>
          </section>
          <section>
            <fieldset>
              <legend htmlFor="phone">Phone</legend>
              <input
                onChange={this.handleChange}
                value={phone}
                type="text"
                name="phone"
                id="phone"
              />
            </fieldset>
          </section>
        </form>
      </>
    )
  }
}
