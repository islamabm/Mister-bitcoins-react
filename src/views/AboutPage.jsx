import React from 'react'

export function AboutPage() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about Mister-BITCoin</p>
      </div>
      <div className="about-content">
        <img
          src="https://static.currency.com/img/media/bitcoin.dd8a16.png"
          alt="About Image"
        />
        <div className="line"></div>
        <p>
          Mister-BITCoin is a leading platform for buying and selling
          cryptocurrencies. Our mission is to empower people to take control of
          their finances by providing them with easy access to the world of
          digital assets. We believe that everyone should have the opportunity
          to participate in the decentralized economy, and we're committed to
          making that vision a reality.
        </p>
      </div>
    </div>
  )
}
