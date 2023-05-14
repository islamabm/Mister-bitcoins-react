import React, { useEffect } from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'
import './assets/scss/global.scss'
import { Home } from './views/Home'
import { ContactIndex } from './views/ContactIndex'
import { HomePage } from './views/HomePage'
import { AboutPage } from './views/AboutPage'
import { ContactEdit } from './views/ContactEdit'
import { AppHeader } from '../src/cmps/AppHeader'
import { ContactDetails } from './views/ContactDetails'
import { Signup } from './views/Signup'
import { StatisticPage } from './views/StatisticPage'
import { GoogleMaps } from './views/GoogleMaps'
function App() {
  useEffect(() => {
    // Create the coins and add them to the DOM
    const numCoins = 400 // Change this to control the number of coins
    for (let i = 0; i < numCoins; i++) {
      const coin = document.createElement('div')
      coin.classList.add('coin')
      coin.style.left = `${Math.random() * 100}%`
      coin.style.animationDelay = `${Math.random() * 3}s`
      document.body.appendChild(coin)
    }

    // Clean up the coins when the animation finishes
    setTimeout(() => {
      const coins = document.querySelectorAll('.coin')
      coins.forEach((coin) => coin.remove())
    }, 3000)
  }, [])

  return (
    <section className="main-container">
      <Router>
        <AppHeader />
        <div className="App">
          <Route path="/contact/edit/:id?" component={ContactEdit} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/sign" component={Signup} />
          <Route path="/home" component={HomePage} />
          <Route path="/maps" component={GoogleMaps} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chart" component={StatisticPage} />
          <Route path="/user" component={Home} />
          <Route exact path="/" component={ContactIndex} />
        </div>
      </Router>
    </section>
  )
}

export default App
