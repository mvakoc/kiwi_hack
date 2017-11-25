import React, { Component } from "react";
import Carousel from "nuka-carousel";
import Card from "./Card";
import botStore from "../stores/botStore";
import { nextBotState } from "../actions/botAction";
import ReactDOM from 'react-dom'
import "./App.css";
import phoneBody from "../assets/iphone_ui.png";

export default class Emma extends Component {
  componentDidUpdate = () => {
    const node = ReactDOM.findDOMNode(this.bottomComponent);
    node.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <div
        className="flex h-100 w-100 flex-column absolute bg-black-90 top-0"
        style={{
          transition: "all .5s ease",
          opacity: this.props.isHidden ? "0" : "1"
        }}
      >
        <div
          className="flex-auto pt4 ph2 fw1 f3 overflow-scroll pb4"
          style={{
            textShadow: "0 0 10px black",
            color: "rgba(255, 255, 255, 0.9)"
          }}
        >
          {this.props.messages.map((message, index) => (
            <div
              key={index}
              className={`mv4 ${message.from === "me" ? "tr" : "tl"}`}
            >
              <div>{message.content}</div>
              {message.offers && (
                <Carousel>
                  {message.offers.map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
                </Carousel>
              )}
            </div>
          ))}
          <div className="tr mt2 mb2">
            {this.props.interim.split(" ").map((value, index) => (
              <div
                style={{ display: "inline-block" }}
                key={index}
                className="addMessage nowrap overflow-hidden pr1"
              >
                {value + " "}
              </div>
            ))}
          </div>
          <div className="tr mt2 mb5" ref={(dummy) => this.bottomComponent = dummy} />
        </div>
      </div>
    );
  }
}
