import React from 'react'
import { Link } from 'react-router-dom'
export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Mister-BITCoin!</h1>
          <p>Discover the power of digital assets today.</p>
        </div>
        <img
          src="https://imageio.forbes.com/specials-images/dam/imageserve/908633080/960x0.jpg?format=jpg&width=960"
          alt="Toys"
          className="hero-image"
        />
      </section>
      <Link to="/sign" className="signup-button">
        Sign Up
      </Link>
    </main>
  )
}
