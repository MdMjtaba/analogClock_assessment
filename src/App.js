import React, { Component } from "react";
import AnalogClock from "analog-clock-react";

export default class App extends Component {
  interval = null;
  constructor(props) {
    super(props);

    this.state = {
      isCustomTime: false,
      options: {
        useCustomTime: false,
        width: "300px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
          second: "#2e2e2e",
          minute: "#ffffff",
          hour: "#ffffff",
        },
      },
    };
  }

  clockchangeHandler = (value) => {
    console.log("calling change handler");
    let _options = this.state.options;
    if (value === true) {
      console.log("calling test", this.state.options.useCustomTime);
      let useCustomTime = true;
      this.setState(
        {
          options: { ...this.state.options, useCustomTime },
          isCustomTime: true,
        },

        () => console.log("Mujtaba calling", this.state.options)
      );
      this.interval = setInterval(() => this.updateClock(), 1000);
    } else {
      console.log("false");
      let useCustomTime = false;
      clearInterval(this.interval);
      delete _options.seconds;
      delete _options.minutes;
      delete _options.hours;

      this.setState({ options: { ..._options } });
      this.setState({
        options: { ...this.state.options, useCustomTime },
        isCustomTime: false,
      });
    }
  };

  updateClock = () => {
    let useCustomTime = "yes";
    let ausTime = new Date().toLocaleString("en-US", {
      timeZone: "Australia/Brisbane",
    });

    console.log("options before=>", this.state.options);
    let date = new Date(ausTime);

    this.setState({
      options: {
        ...this.state.options,
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours(),
      },
    });
  };


  render() {
    return (
      <div style={{marginTop:"3%", marginLeft:"40%"}}>
        <AnalogClock {...this.state.options} />
        <br />
        <button
          style={{
            width: "135px",
            height: "33px",
            fontWeight: "bold",
          }}
          onClick={() => {
            this.clockchangeHandler(true);
          }}
        >
          Australia
        </button>
        <button
          style={{
            width: "135px",
            height: "33px",
            fontWeight: "bold",
          }}
          onClick={() => {
            this.clockchangeHandler(false);
          }}
        >
          India
        </button>
      </div>
    );
  }
}
