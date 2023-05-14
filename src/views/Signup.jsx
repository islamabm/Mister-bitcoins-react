import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { connect } from 'react-redux'
import { spendBalance } from '../store/actions/user.actions'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const _Signup = (props) => {
  const [fullname, setFullname] = useState('')
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const doSignup = (event) => {
    event.preventDefault()
    signupUser(fullname)
  }

  const handleFullnameChange = (event) => {
    setFullname(event.target.value)
  }

  const signupUser = async (name) => {
    await userService.signup(name)
    let synth = window.speechSynthesis
    let utterThis = new SpeechSynthesisUtterance(
      `Hello ${name} welcome to mister bitcoin application`
    )
    synth.speak(utterThis)
    props.history.push('/')
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log('codeResponse:', codeResponse) // to inspect the structure of codeResponse

      if (codeResponse && codeResponse.access_token) {
        console.log('hi')
        setUser({ ...codeResponse, access_token: codeResponse.access_token })

        // Fetch user profile data
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: 'application/json',
              },
            }
          )
          .then(async (res) => {
            if (res.data) {
              setProfile(res.data)
              setFullname(res.data.name)
              await signupUser(res.data.name)
            }
            console.log('Profile data:', res.data)
          })
          .catch((err) => console.log(err))
      } else {
        console.error('Login Failed: codeResponse or accessToken is undefined')
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  })

  useEffect(() => {
    if (profile && profile.name) {
      userService.signup(profile.name)
      let synth = window.speechSynthesis
      let utterThis = new SpeechSynthesisUtterance(
        `Hello ${profile.name} welcome to mister bitcoin application`
      )
      synth.speak(utterThis)
      props.history.push('/')
    }
  }, [profile, props.history])

  useEffect(() => {
    if (profile && profile.name) {
      signupUser(profile.name)
    }
  }, [profile, props.history])

  return (
    <div className="modal-container">
      <form className="signup-form" onSubmit={doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          value={fullname}
          placeholder="Your full name"
          onChange={handleFullnameChange}
        />
        <button type="submit">Signup</button>
        <div className="or-section">
          <div className="line"></div>
          <span>OR</span>
          <div className="line"></div>
        </div>
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.contactModule.user,
})

const mapDispatchToProps = {
  spendBalance,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)
