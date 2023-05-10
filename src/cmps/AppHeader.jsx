import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getBitcoinSvg } from '../services/SVG.service'

export function AppHeader() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const close = () => {
    setShowMenu(!showMenu)
  }
  return (
    <section className="full">
      <header className="header full">
        <div className="logo">
          <img
            src="https://static.currency.com/img/media/bitcoin.dd8a16.png"
            alt="Mister-BITCoin logo"
          />
          <Link to="/">Mister-BITCoin</Link>
        </div>
        <nav className={showMenu ? 'show-menu' : ''}>
          <ul>
            <li>
              <NavLink onClick={close} to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={close} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={close} to="/chart">
                Chart
              </NavLink>
            </li>
            <li>
              <NavLink onClick={close} to="/user">
                User
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span
            className="svg"
            onClick={toggleMenu}
            dangerouslySetInnerHTML={{
              __html: getBitcoinSvg(showMenu ? 'noMenu' : 'menu'),
            }}
          />
        </button>
      </header>
    </section>
  )
}
