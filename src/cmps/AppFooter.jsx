import React from 'react'

export function AppFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img
              src="https://static.currency.com/img/media/bitcoin.dd8a16.png"
              alt="Mister-BITCoin logo"
            />
            <h1>Mister-BITCoin</h1>
          </div>
          <div className="footer-nav">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <ul>
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Mister-BITCoin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
