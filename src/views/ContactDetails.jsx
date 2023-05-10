import { Component } from 'react'
import { contactService } from '../services/contact.service'
import TransferFund from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'
import { spendBalance, transferCoins } from '../store/actions/user.actions'
import { getBitcoinSvg } from '../services/SVG.service'
import { connect } from 'react-redux'
class _ContactDetails extends Component {
  state = {
    contact: null,

    // moves: [],
  }

  componentDidMount() {
    this.loadContact()

    // this.loadMoves()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  async loadContact() {
    try {
      const contact = await contactService.getContactById(
        this.props.match.params.id
      )
      console.log(contact)
      this.setState({ contact })
    } catch (error) {
      console.log('error:', error)
    }
  }

  get getMovesForContact() {
    const { contact } = this.state
    const { user } = this.props
    return user.moves.filter((move) => move.toId === contact._id) || []
  }
  onBack = () => {
    this.props.history.push('/')
  }
  onTransferCoins = (amount, contact) => {
    this.props.transferCoins(amount, contact)
  }

  render() {
    const { contact } = this.state

    if (!contact) return <div className="loader"></div>
    return (
      <>
        <section className="contact-details">
          <section>
            <h3>Name: {contact.name}</h3>
          </section>
          <section>
            <h3>Email: {contact.email}</h3>
          </section>
          <section>
            <h3>Phone: {contact.phone}</h3>
          </section>
          <div className="arrow left"></div>
          <img
            src={`https://robohash.org/${contact._id}?set=set5`}
            alt={contact.name}
          />

          <div className="arrow right"></div>
          <button className="glow-on-hover" onClick={this.onBack}>
            Back
          </button>
        </section>
        <TransferFund
          contact={contact}
          onTransferCoins={this.onTransferCoins}
        />
        <MovesList
          title={this.getMovesForContact.length ? 'Your Moves:' : 'No Moves'}
          movesList={this.getMovesForContact}
        />
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.userModule.loggedInUser,
})

const mapDispatchToProps = { spendBalance, transferCoins }

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails)
