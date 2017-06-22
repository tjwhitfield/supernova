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
  // getUTCHours() to convert ms to a time indep. of time zone
  var hr = addZeroes(time.getUTCHours(), 2);
  var min = addZeroes(time.getUTCMinutes(), 2);
  var sec = addZeroes(time.getUTCSeconds(), 2);
  var diff = hr + ":" + min + ":" + sec;
  return diff;
}

function Message(props) {
  return <h3>Greetings, {props.name}!</h3>;
}

class Response extends React.Component {

  render() {
    const isTentative = this.props.tentative;
    if (isTentative) {
      return (
        <p>Anyway, try to get this cleaned before {this.props.deadline}!</p>
      );
    } else {
      return null;
    }
  }
}

class Issue extends React.Component {

  render() {
    const isHappy = this.props.happy;
    let footnote = null;
    if (isHappy) {
      footnote = <p><i>By the way, this app was created using ReactJS,
        which is pretty cool.</i></p>
    }
    const isTentative = this.props.tentative;
      return (
        <div>
          <p>I'm pretty sure {this.props.instigator} left some spilled milk on
            {this.props.victim}'s time machine, which may be a problem according
            to {this.props.boss.lastname}...</p>
          <Response tentative={this.props.tentative}
            deadline={this.props.deadline} />
          {footnote}
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
      midnight: new Date(nowInit.getFullYear(), nowInit.getMonth(),
        nowInit.getDate() + 1, 0, 0, 0, 0),
      counter: 0,
      counter2: 0
    };
  }

  tick() {
    var nowInit = new Date();
    this.setState(
      (prevState) => ({
        now: nowInit,
        midnight: new Date(nowInit.getFullYear(), nowInit.getMonth(),
          nowInit.getDate() + 1, 0, 0, 0, 0),
        counter: prevState.counter + 1
      })
    );
  }

  componentDidMount() {
    this.fastCount = setInterval(
      () => this.tick(),
      1000
    );
    this.slowCount = setInterval(
      () => this.setState(
        (prevState) => ({
          counter2: prevState.counter2 + 10
        })
      ),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fastCount);
    clearInterval(this.slowCount);
  }

  render() {
    return (
      <div className="App-intro">
        <p>Countdown till blast-off!</p>
        <h1>{displayDiff(getDiff(this.state.now, this.state.midnight))}</h1>
        <h3>Count Fast: {this.state.counter}</h3>
        <h3>Count Slow: {this.state.counter2}</h3>
      </div>
    );
  }
}

class Protected extends React.Component {

  render() {
    const content = (
      <div className="Protected-content">
        <Timer />
        <Message name="Jorgensen" />
        <Issue boss={Boss("George", "Hill")} instigator="Bobby" victim="Michael"
          tentative={true} deadline="Friday" happy={true} />
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
        <p>Take up space...</p>
      </div>
    );
    return content;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  authHandler = (prevState) => {
    this.setState(
      (prevState) => ({
        loggedIn: !prevState.loggedIn
      })
    );
  }

  render() {
    let protectedContent = null;
    let authButtonText = "Log In";
    if (this.state.loggedIn) {
      protectedContent = <Protected />
      authButtonText = "Log Out";
    }
    const page = (
      <div className="App">
        <div className="App-header">
            <div className="Auth">
              <button
                onClick={this.authHandler}>{authButtonText}</button>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
        </div>
        {protectedContent}
      </div>
    );
    return page;
  }
}

export default App;
