import { Component } from 'react'
import { contactService } from '../services/contact.service'

import { btnService } from '../services/btnAnimation.service'
export class ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
  }

  async componentDidMount() {
    const contactId = this.props.match.params.id
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
      } catch (error) {
        console.log('error:', error)
      }
    }
    btnService.addBubble()
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    try {
      await contactService.saveContact({ ...this.state.contact })
      btnService.animateButton(ev).then(() => {
        this.props.history.push('/')
      })
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(`Contact edited`)
      synth.speak(utterThis)
      // setTimeout(() => {
      // }, 1000)
    } catch (error) {
      console.log('error:', error)
    }
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
    }
    this.setState(({ contact }) => ({
      contact: { ...contact, [field]: value },
    }))
  }

  render() {
    const { contact } = this.state
    const { name, email } = contact
    return (
      <section className="contact-edit">
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
        <form onSubmit={this.onSaveContact}>
          <input
            value={name}
            onChange={this.handleChange}
            type="text"
            name="name"
            id="name"
          />

          <input
            value={email}
            onChange={this.handleChange}
            type="text"
            name="email"
            id="email"
          />

          <button onClick={this.onSaveContact} className="bubbly-button">
            Save
          </button>
        </form>
      </section>
    )
  }
}
