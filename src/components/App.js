import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import counterStore from '../stores/counterStore'
import {incrementCounter} from '../actions/counterAction'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  componentWillMount() {
    counterStore.addChangeListener(this.handleCounterChange)
  }

  componentWillUnmount() {
    counterStore.removeChangeListener(this.handleCounterChange)
  }

  handleCounterChange = () => {
    this.setState({
      counter: counterStore.getCounter()
    })
  }

  handleButtonClick = () => {
    incrementCounter()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>counter {this.state.counter}</div>
        <button onClick={this.handleButtonClick}>Increment</button>
      </div>
    );
  }
}

export default App;
