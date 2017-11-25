import React, { Component } from "react";

export default class EmmaActionButton extends Component {
  constructor() {
      super();
      this.state = {
          alertMode: true
      }
  }

  handleClick = () => {
      if (this.state.alertMode) {
          this.setState({
              alertMode: false
          })
          this.props.onClick(true)
      } else {
          this.props.onClick(false)
      }
  }

  render() {
    return (
      <div
        className={`absolute bottom-0 left-0 right-0 flex w-100 flex-column items-center justify-center`}
        style={{
          transition: "height 0.5s ease",
          height: 100
        }}
      >
        <div
          onClick={this.handleClick}
          className="br-pill flex items-center justify-center pointer shadow-1 fadeInUp"
          style={{
            width: 75,
            height: 75,
            background: `linear-gradient(135deg, ${this.state.alertMode ? 'blue' : 'purple'} 0%, ${this.state.alertMode ? 'green' : 'blue'} 100%)`,
            boxShadow:
              "0 19px 60px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.22)",
            transition: "all 0.5s ease",
            pointerEvents: "all",
            transform: this.state.alertMode ? 'scale(0.7) translate(150px, 20px)' : ''
          }}
        >
          <div
            className={`br-pill ${this.props.recognizing ? "pulsate" : ""}`}
            style={{
              width: 75,
              height: 75,
              backgroundColor: "#D7FFF1",
              transition: "width 1s ease, height 1s ease, opacity 1s ease",
              opacity: 0.3,
            }}
          />
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center white f1">
            {this.state.alertMode &&
                <i className="material-icons">grade</i>
            }
            {!this.state.alertMode && 
                <i className="material-icons">mic</i>
            }
          </div>
        </div>
      </div>
    );
  }
}
