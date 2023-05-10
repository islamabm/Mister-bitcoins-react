import React, { Component } from 'react'

export class MovesList extends Component {
  render() {
    const { title, movesList } = this.props
    if (!title || !movesList) return <div className="loader"></div>
    return (
      <section className="moves-list-container">
        <h3>{title}</h3>
        <ul>
          {movesList.map((move, idx) => {
            return (
              <li key={idx}>
                <p>To: {move.to}</p>
                <p>At:{new Date(move.at).toLocaleString('en-GB')}</p>
                <p>Amount:{move.amount} coins</p>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}
