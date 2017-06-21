import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getDiff(now, midnight) {
  var midnightMillis = Date.parse(midnight.toString());
  var nowMillis = Date.parse(now.toString());
  var remainingMillis = midnightMillis - nowMillis;
  return remainingMillis;
}

function addZeroes(count, max) {
  var paddedCount = count.toString();
  var zeroStr = "0";
  while (paddedCount.length < max) {
    paddedCount = zeroStr.concat(paddedCount);
  }
  return paddedCount;
}

function displayDiff(millis) {
  var time = new Date(millis);
  var hr = addZeroes(time.getUTCHours(), 2); // getUTCHours() to convert ms to a time indep. of time zone
  var min = addZeroes(time.getUTCMinutes(), 2);
  var sec = addZeroes(time.getUTCSeconds(), 2);
  var diff = hr + ":" + min + ":" + sec;
  return diff;
}

function Message(props) {
  return <h3>Greetings, {props.name}!</h3>;
}

class Excuse extends React.Component {
  render() {
    return (
      <div>
        <p>By the way, I'm pretty sure {this.props.instigator} left some spilled milk on {this.props.victim}'s time machine, which may be a problem according to {this.props.boss.lastname}...</p>
        <p>Anyway, try to get this cleaned before {this.props.deadline}!</p>
      </div>
    );
  }
}

function Boss(first, last) {
  return (
    {
      firstname: first,
      lastname: last
    }
  );
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    var nowInit = new Date();
    this.state = {
      now: nowInit,
      midnight: new Date(nowInit.getFullYear(), nowInit.getMonth(), nowInit.getDate() + 1, 0, 0, 0, 0),
      counter: 0,
      counter2: 0
    };
  }
  tick() {
    var nowInit = new Date();
    this.setState(
      (prevState) => ({
        now: nowInit,
        midnight: new Date(nowInit.getFullYear(), nowInit.getMonth(), nowInit.getDate() + 1, 0, 0, 0, 0),
        counter: prevState.counter + 1
      })
    );
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.evenID = setInterval(
      () => this.setState(
        (prevState) => ({
          counter2: prevState.counter2 + 2
        })
      ),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div>
        <p className="App-intro">
          Countdown till blast-off!
        </p>
        <h1>{displayDiff(getDiff(this.state.now, this.state.midnight))}</h1>
        <h3>Count Evermonde: {this.state.counter}</h3>
        <h3>Count Even: {this.state.counter2}</h3>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const page = (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Timer />
        <Message name="Jorgensen" />
        <Excuse boss={Boss("George", "Hill")} instigator="Bobby" victim="Michael" deadline="Friday" />
      </div>
    );
    return (
      page
    );
  }
}

export default App;
