import React, { Component, useState, useEffect } from 'react'

import { userService } from '../services/user.service'
import { connect } from 'react-redux'
import { spendBalance } from '../store/actions/user.actions'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
const _Signup = (props) => {
  const [fullname, setFullname] = useState('')
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const doSignup = (event) => {
    event.preventDefault()
    userService.signup(fullname)
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(
      `Hello ${fullname} welcome to mister bitcoin application`
    )
    synth.speak(utterThis)
    props.history.push('/')
  }

  const handleFullnameChange = (event) => {
    setFullname(event.target.value)
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser({ ...codeResponse, access_token: codeResponse.access_token })
      setFullname(codeResponse.profileObj.name)
      userService.signup(profile.name)
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Hello ${profile.name} welcome to mister bitcoin application`
      )
      synth.speak(utterThis)
      props.history.push('/')
    },
    onError: (error) => console.log('Login Failed:', error),
  })
  useEffect(() => {
    if (profile.name) {
      userService.signup(profile.name)
      props.history.push('/')
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Hello ${profile.name} welcome to mister bitcoin application`
      )
      synth.speak(utterThis)
    }
  }, [profile, props.history])

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data)
          console.log('Profile data:', res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <>
      <form className="signup-form" onSubmit={doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          value={fullname}
          placeholder="Your full name"
          onChange={handleFullnameChange}
        />
        <button type="submit">Signup</button>
      </form>

      {/* {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          </div>
          ) 
        : ( */}
      <button onClick={logOut}>Log out</button>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
      {/* )} */}
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.contactModule.user,
})

const mapDispatchToProps = {
  spendBalance,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)
