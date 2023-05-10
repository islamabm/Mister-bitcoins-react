import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
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
      console.log('removedContact', removedContact)
    } catch (error) {
      console.err('error:', error)
    }
  }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts()
  }

  render() {
    const { contacts, filterBy } = this.props
    if (!contacts) return <div className="loader"></div>
    return (
      <section className="contact-index">
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
