import React, { Component } from "react";
import Test from "../HomePage/Test/Test";
import { Button } from "semantic-ui-react";

class Clock extends Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  render() {
    const { time } = this.props;
    return (
      <div className="displayedTime">
        <h1>{this.format(time)}</h1>
        {time === 0 ? <p>Time out!</p> : ""}
      </div>
    );
  }
}

class Input extends Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onSetCountdown(parseInt(15, 10)); //No of seconds to changeeeee
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit.bind(this)}>
        <Button
          style={{ marginTop: "20px" }}
          basic
          primary
          type="submit"
          value="Start"
        >
          Start the test!
        </Button>
      </form>
    );
  }
}

export class TeacherClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 15, //initial count to changeeeee
      running: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount >= 0 ? newCount : 0 });
    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState({ running: false });
    }
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="container">
        <Clock time={count} />
        <Input onSetCountdown={this.handleCountdown.bind(this)} />
        <Button
          type="stop"
          style={{ marginTop: "10px" }}
          basic
          color="red"
          onClickHandler={this.handleStop.bind(this)}
        >
          Stop the test!
        </Button>
      </div>
    );
  }
}

export class StudentClock1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 15, //initial count to changeeeee
      running: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount >= 0 ? newCount : 0 });
    }, 1000);
  }

  // handleStop() {
  //   if(this.timer) {
  //     clearInterval(this.timer);
  //     this.setState(
  //       {running:false}
  //     );
  //   }
  // }

  // handleCountdown(seconds) {
  //   this.setState({
  //     count: seconds,
  //     running: true
  //   })
  // }

  componentDidMount() {
    this.setState({
      count: 15,
      running: true,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="container">
        <Clock time={count} />
        {/* <Input onSetCountdown={this.handleCountdown.bind(this)}/> */}
        {/* <Button label="stop" onClickHandler={this.handleStop.bind(this)}/> */}
      </div>
    );
  }
}

export class StudentClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 13, //initial count to changeeeee
      running: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({ count: newCount >= 0 ? newCount : 0 });
    }, 1000);
  }

  // handleStop() {
  //   if(this.timer) {
  //     clearInterval(this.timer);
  //     this.setState(
  //       {running:false}
  //     );
  //   }
  // }

  // handleCountdown(seconds) {
  //   this.setState({
  //     count: seconds,
  //     running: true
  //   })
  // }

  componentDidMount() {
    this.setState({
      count: 13,
      running: true,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="container">
        <Clock time={count} />
        {/* <Input onSetCountdown={this.handleCountdown.bind(this)}/> */}
        {/* <Button label="stop" onClickHandler={this.handleStop.bind(this)}/> */}
      </div>
    );
  }
}
