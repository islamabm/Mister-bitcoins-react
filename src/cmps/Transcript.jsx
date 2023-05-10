import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getBitcoinSvg } from '../services/SVG.service'
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new SpeechRecognition()

export class Transcript extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transcript: '',
      isRecording: false,
    }
  }

  // handleResult = (event) => {
  //   const last = event.results.length - 1
  //   const transcript = event.results[last][0].transcript.trim()

  //   let [command, ...valueParts] = transcript.split(' ')
  //   let value = valueParts.join(' ')

  //   command = command.toLowerCase()
  //   if (command === 'filter' || command === 'remove') {
  //     this.props.onCommand({ command, value })
  //   }
  // }

  emitTranscript = (text) => {
    const event = new CustomEvent('transcript', { detail: text })
    window.dispatchEvent(event)
    window.dispatchEvent(new CustomEvent('transcript', { detail: text }))
  }
  checkForCommand(result) {
    const t = result[0].transcript
    if (t.includes('stop recording')) {
      sr.stop()
    } else if (t.includes('delete')) {
      const input = document.querySelector('#my-input')
      if (input !== null) {
        input.value = ''
        this.emitTranscript('')
      }
    } else if (
      t.includes('what is the time') ||
      t.includes("what's the time")
    ) {
      sr.stop()
      alert(new Date().toLocaleTimeString())
      setTimeout(() => sr.start(), 100)
    } else {
      this.emitTranscript(t)
    }
  }
  toggleMic = () => {
    if (this.state.isRecording) {
      sr.stop()
      this.emitTranscript(this.state.transcript)
    } else {
      sr.start()
    }
  }

  componentDidMount() {
    sr.continuous = true
    sr.interimResults = true

    sr.onstart = () => {
      console.log('SR Started')
      this.setState({ isRecording: true })

      // let synth = window.speechSynthesis
      // let utterThis = new SpeechSynthesisUtterance(`Hello ${this.props.name}`)
      // synth.speak(utterThis)
    }

    sr.onend = () => {
      console.log('SR Stopped')
      this.setState({ isRecording: false })
    }

    sr.onresult = (evt) => {
      for (let i = 0; i < evt.results.length; i++) {
        const result = evt.results[i]

        if (result.isFinal) this.checkForCommand(result)
      }

      const t = Array.from(evt.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')

      this.setState({ transcript: t })
    }
  }

  render() {
    return (
      <div className="record-container">
        <button
          className={`mic`}
          onClick={(e) => {
            e.stopPropagation()
            this.toggleMic()
          }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: getBitcoinSvg('record'),
            }}
          />
        </button>
      </div>
    )
  }
}
