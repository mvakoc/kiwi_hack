import React, { Component } from 'react'
import Chart from './Chart'
import EmmaActionButton from './EmmaActionButton'
import phoneBody from "../assets/iphone_ui.png";

export default class InnoSvet extends Component {
  render() {
    return (
      <div className='flex h-100 w-100 flex-column' style={{
        transition: 'all .5s ease',
        filter: this.props.isBlurred ? 'blur(50px)' : ''
      }}>
      <div
          style={{
            backgroundSize: "contain",
            width: 360,
            height: 715,
            position: "absolute",
            pointerEvents: "none"
          }}
        />
      </div>
    )
  }
}