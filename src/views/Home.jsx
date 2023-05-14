import { Component } from 'react'
import { userService } from '../services/user.service.js'
import { bitcoinService } from '../services/bitcoin.service.js'
import { MovesList } from '../cmps/MovesList'
import { Link } from 'react-router-dom'

export class Home extends Component {
  state = {
    user: null,
    bitcoinRate: null,
  }

  componentDidMount() {
    this.loadUser()
  }

  loadUser = async () => {
    try {
      const user = userService.getLoggedinUser()
      this.setState({ user })
      const rate = await bitcoinService.getRate(user.coins)
      this.setState({ bitcoinRate: rate })
    } catch (err) {
      console.error('err:', err)
    }
  }
  get getMovesForUser() {
    const { user } = this.state
    return user.moves.slice(0, 3) || []
  }

  render() {
    const { user, bitcoinRate } = this.state
    if (!user || bitcoinRate === null) return <div className="loader"></div>
    return (
      <>
        <section className="user-details">
          <img src={user.url} />
          <h1>Hello {user.name}!</h1>
          <div className="coins-details">
            <img
              src="https://www.mint.ca/globalassets/products/2022/204103-120-oz-pure-gold-coin-everlasting-maple-leaf/204103_obv-1198.png?hash=637883174020000000"
              alt="coins"
            />
            <h1>Coins: {user.coins}</h1>
          </div>
          <div className="bitcoin-details">
            <img
              src="https://static.currency.com/img/media/bitcoin.dd8a16.png"
              alt="Bitcoin"
            />
            <h1>Bitcoin rate: {bitcoinRate}</h1>
          </div>
        </section>
        <Link to="/maps">Maps</Link>
        <MovesList
          title={
            this.getMovesForUser.length ? 'Your Last 3 Moves:' : 'No Moves'
          }
          movesList={this.getMovesForUser}
        />
      </>
    )
  }
}
