import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Response.propTypes = {
  tentative: PropTypes.bool.isRequired,
  deadline: PropTypes.string.isRequired
};

function Boss(first, last) {
  return (
    {
      firstname: first,
      lastname: last
    }
  );
}

class Issue extends React.Component {

  render() {
    const isHappy = this.props.happy;
    let footnote = null;
    if (isHappy) {
      footnote = <p><i>By the way, this app was created using ReactJS,
        which is pretty cool.</i></p>
    }
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

Issue.propTypes = {
  boss: PropTypes.object.isRequired,
  tentative: PropTypes.bool.isRequired,
  deadline: PropTypes.string.isRequired,
  happy: PropTypes.bool.isRequired
};

Issue.defaultProps = {
  tentative: true,
  happy: true
};

class Counter extends React.Component {

  getCountToDisplay = () => {
    const countToDisplay = this.props.count -
      (this.props.count % this.props.interval);
    return countToDisplay;
  }

  render() {
    const content = (
      <div>
        <h3>{this.getCountToDisplay()}</h3>
      </div>
    );
    return content;
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired
};

class Timer extends React.Component {

  constructor(props) {
    super(props);
    const nowInit = new Date();
    this.state = {
      now: nowInit,
      midnight: this.getMidnight(),
      count: 0
    };
  }

  getMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(),
      now.getDate() + 1, 0, 0, 0, 0);
    return midnight;
  }

  tick = () => {
    const nowInit = new Date();
    this.setState(
      (prevState) => ({
        now: nowInit,
        midnight: this.getMidnight(),
        count: prevState.count + 1
      })
    );
  }

  componentDidMount() {
    this.keepTicking = setInterval(
      this.tick,
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.keepTicking);
  }

  render() {
    return (
      <div className="App-intro">
        <p>Countdown till blast-off!</p>
        <h1>{displayDiff(getDiff(this.state.now, this.state.midnight))}</h1>
        <Counter count={this.state.count} interval={1} />
        <Counter count={this.state.count} interval={10} />
      </div>
    );
  }
}

class NumberList extends React.Component {

  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    const numberList = numbers.map(
      (number) =>
        <li key={number.toString()}>
          This is silly line #{number * this.props.interval}.
        </li>
    );
    const content = (
      <div>
        {numberList}
      </div>
    );
    return content;
  }
}

NumberList.propTypes = {
  interval: PropTypes.number.isRequired
};

class Unprotected extends React.Component {

  render() {
    const content = (
      <div>
        <p><i>Please log in to continue.</i></p>
      </div>
    );
    return content;
  }
}

class Protected extends React.Component {

  render() {
    const content = (
      <div className="Protected-content">
        <Timer />
        <Message name="Jorgensen" />
        <Issue boss={Boss("George", "Hill")} instigator="Bobby" victim="Michael"
          deadline="Friday" />
        <NumberList interval={2} />
      </div>
    );
    return content;
  }
}

class LoginDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      UsernameEntry: null,
      PasswordEntry: null,
      loggedIn: false,
      hasFailed: false
    };
  }

  handleChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    this.setState({
      [targetName]: targetValue
    });
  }

  isValidLogIn = (username, password) => {
    return ((username === 'Tim') && (password === 'secret'));
  }

  processLogInResult = (isSuccess) => {
    this.props.authResultHandler(isSuccess);
    this.setState({
      loggedIn: isSuccess
    });
  }

  handleCancel = () => {
    const isSuccess = null;
    this.processLogInResult(isSuccess);
  }

  handleLogIn = () => {
    const isSuccess = this.isValidLogIn(
      this.state.UsernameEntry,
      this.state.PasswordEntry);
    this.processLogInResult(isSuccess);
    if (!isSuccess) {
      this.setState({
        hasFailed: true
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    let content = null;
    let message = null;
    if (this.state.hasFailed) {
      message = <p>Not allowed in here!</p>;
    }
    if (!this.state.loggedIn) {
      content = (
        <div className="Login">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="Dialog-row">
              <span className="Dialog-left">Username: </span>
              <input type="text" name="UsernameEntry" className="Dialog-right"
                onChange={this.handleChange} />
            </div>
            <div className="Dialog-row">
              <span className="Dialog-left">Password: </span>
              <input type="password" name="PasswordEntry"
                className="Dialog-right" onChange={this.handleChange} />
            </div>
            <div className="Dialog-row"></div>
            <div className="Dialog-row">
              <input type="submit" name="CancelButton" className="Dialog-left"
                value="Cancel" onClick={this.handleCancel} />
              <input type="submit" name="LogInButton" className="Dialog-right"
                value="Log In" onClick={this.handleLogIn} />
            </div>
          </form>
          {message}
        </div>
      );
    }
    return content;
  }
}

LoginDialog.propTypes = {
  authResultHandler: PropTypes.func.isRequired
};

class Auth extends React.Component {

  handleClick = () => {
    this.props.handleClick();
  }

  render() {
    let authButtonText = null;
    if (this.props.loggedIn) {
      authButtonText = "Log Out";
    } else {
      authButtonText = "Log In";
    }
    const content = (
      <div className="Auth">
        <button
          onClick={this.handleClick}>{authButtonText}</button>
      </div>
    );
    return content;
  }
}

Auth.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      attemptingLogIn: false
    };
  }

  handleAuthButtonClick = (prevState) => {
    if (this.state.loggedIn) {
      this.setState({
        loggedIn: false,
        attemptingLogIn: false
      });
    } else {
      if (!this.state.attemptingLogIn) {
        this.setState({
          attemptingLogIn: true
        });
      }
    }
  }

  handleAuthResult = (authResult) => {
    if (authResult != null) {
      if (authResult) {
        this.setState({
          loggedIn: true,
          attemptingLogIn: false
        });
      } else {
      }
    } else {
      this.setState({
        attemptingLogIn: false
      });
    }
  }

  render() {
    let content = null;
    let dialog = null;
    if (this.state.loggedIn) {
      content = <Protected />;
    } else {
      content = <Unprotected />;
      if (this.state.attemptingLogIn) {
        dialog = <LoginDialog authResultHandler={this.handleAuthResult} />;
      }
    }
    const page = (
      <div className="App">
        <div className="App-header">
            <Auth loggedIn={this.state.loggedIn}
              handleClick={this.handleAuthButtonClick} />
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
        </div>
        {content}
        {dialog}
      </div>
    );
    return page;
  }
}

export default App;
