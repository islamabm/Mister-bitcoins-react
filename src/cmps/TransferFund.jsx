import React from 'react'
import { useState } from 'react'

export default function TransferFund({ contact, onTransferCoins }) {
  const [amount, setAmount] = useState(0)

  function onSetAmount({ target }) {
    setAmount(target.value)
  }

  return (
    <section className="send-coins-container">
      <h1>Transfer coins to {contact.name}</h1>
      <section className="amount-form">
        <input type="number" name="amount" id="amount" onChange={onSetAmount} />
        <button
          className="transfer-btn"
          onClick={() => onTransferCoins(amount, contact)}
        >
          Transfer
        </button>
      </section>
    </section>
  )
}
