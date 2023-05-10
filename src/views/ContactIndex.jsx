import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
// import { Transcript } from '../cmps/Transcript'
import { connect } from 'react-redux'
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contact.actions'

class _ContactIndex extends Component {
  componentDidMount() {
    console.log('mounted')
    const res = this.props.loadContacts()
    console.log(res)
  }

  onRemoveContact = async (contactId) => {
    try {
      const removedContact = await this.props.removeContact(contactId)
      // const contact = contactService.getContacts().map((c)=>c._id === contactId)
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Contact with  ${contactId} id removed`
      )
      synth.speak(utterThis)
      console.log('removedContact', removedContact)
    } catch (error) {
      console.err('error:', error)
    }
  }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts()
  }
  // handleTranscriptCommand = (commandInfo) => {
  //   console.log('commandInfo', commandInfo)
  //   if (commandInfo.command === 'filter') {
  //     this.onChangeFilter({ term: commandInfo.value })
  //   } else if (commandInfo.command === 'remove') {
  //     this.onRemoveContact(commandInfo.value)
  //   }
  // }

  render() {
    const { contacts, filterBy } = this.props
    if (!contacts) return <div className="loader"></div>
    return (
      <section className="contact-index">
        {/* <Transcript onCommand={this.handleTranscriptCommand} /> */}
        <ContactFilter
          filterBy={filterBy}
          onChangeFilter={this.onChangeFilter}
        />
        <ContactList
          contacts={contacts}
          onRemoveContact={this.onRemoveContact}
        />
      </section>
    )
  }
}
const mapStateToProps = (state) => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,
})

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
}

export const ContactIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactIndex)
