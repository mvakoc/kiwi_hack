import React, { Component } from "react";
import phoneBody from "../assets/iphone_v2.png";
import InnoSvet from "./InnoSvet";
import Emma from "./Emma";
import EmmaActionButton from "./EmmaActionButton";
import botStore from "../stores/botStore";
import { nextBotState } from "../actions/botAction";
import bg from "../assets/bg.jpg";

let voice;

window.speechSynthesis.onvoiceschanged = function() {
  voice = window.speechSynthesis.getVoices()[0];
};

export default class Mobile extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      interim: "",
      emmaIsHidden: true
    };
    this.init_speech();
  }

  componentWillMount() {
    botStore.addChangeListener(this.handleStoreChange);
    this.handleStoreChange();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isHidden && !nextProps.isHidden) {
      nextBotState();
    }
  }

  componentWillUnmount() {
    botStore.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange = () => {
    const newMessages = this.state.messages;
    const nextState = botStore.getState();
    const newMessage = { content: nextState.text };
    if (nextState.offers) {
      newMessage.offers = nextState.offers;
    }
    newMessages.push(newMessage);
    this.setState({
      messages: newMessages
    });
    this.say(newMessage.content);
  };

  render() {
    return (
      <div
        className="flex items-center justify-center vh-100"
        style={{
          background:
          `url('${bg}')`,
            zIndex: -150
        }}
      >
        <div
          style={{
            backgroundImage: `url('${phoneBody}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: 360,
            height: 715,
            position: "absolute",
            pointerEvents: "none",
            zIndex: 0
          }}
        />
        <div
          style={{
            width: 312,
            height: 671,
            borderRadius: 32,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <InnoSvet isBlurred={!this.state.emmaIsHidden} />
          <Emma
            isHidden={this.state.emmaIsHidden}
            messages={this.state.messages}
            interim={this.state.interim}
          />
          <EmmaActionButton
            onClick={isAlertMode => {
              if (isAlertMode) {
                nextBotState("");
                this.setState({
                  emmaIsHidden: false
                });
              } else {
                this.recognition.start();
              }
            }}
            recognizing={this.state.recognizing}
          />
        </div>
      </div>
    );
  }

  init_speech = () => {
    this.recognition = new window.webkitSpeechRecognition();

    if (!("webkitSpeechRecognition" in window)) {
      console.log("Browser not supported");
    }

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.onstart = () => {
      this.setState({
        recognizing: true
      });
      console.log("recognizing yes")
    };

    this.recognition.onend = result => {
      const newMessages = this.state.messages;
      newMessages.push({
        content: this.state.interim,
        from: "me"
      });

      console.log(this.state.interim)
      nextBotState(this.state.interim);
      this.setState({
        message: this.state.newMessages,
        interim: "",
        recognizing: false
      });
    };

    this.recognition.onresult = event => {
      let interim_transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        interim_transcript += cap(event.results[i][0].transcript);
      }
      this.setState({
        interim: interim_transcript
      });
    };

    const cap = string => {
      const s = string.charAt(0).toUpperCase() + string.slice(1);
      const last = s.charAt(s.length - 1);
      return last === "?" || last === "." ? s : s;
    };
  };

  say = message => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = message;
    msg.voice = voice;
    msg.rate = .8
    window.speechSynthesis.speak(msg);
  };
}
