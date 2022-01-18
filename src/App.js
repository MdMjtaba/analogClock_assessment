import React, { Component } from "react";
import AnalogClock from "analog-clock-react";
import CountDown from "./CountDown";
import { Button, Col, Container, Row, Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default class App extends Component {
  interval = null;
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      msg: "",
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

  startClock = () => {
    this.setState({
      isShow: true
    })
  }

  stopClock = (props) => {
    console.log("props value++++++++", props)
    this.setState({
      isShow: false,
      msg: props
    })
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
    let usTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",                             //timeZone: "Australia/Brisbane"
    });

    console.log("options before=>", this.state.options);
    let date = new Date(usTime);

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
      // <div style={{marginTop:"3%", marginLeft:"40%"}}>
      <Container>
        <br/>
        <br/>
        <Row>
          <Col
          className="bg-light border"
          sm={{
            size: 6
          }}
          >
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
              America
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
          </Col>

          <Col
          className="bg-light border"
          sm={{
            size: 6
          }}
          >
            <div>
  <Card>
    <CardBody>
      <CardTitle tag="h5">
        <input type="radio"/>
        GooglePay
      </CardTitle>
      <CardTitle tag="h5">
        <input type="radio"/>
        PhonePe
      </CardTitle>
      
      {this.state.isShow === true ? <CountDown stop={this.stopClock} /> : null}
      <CardText>
        <h3>Proceed with the payment</h3>
      </CardText>
      <CardText style={{color:"red"}}><h4>{this.state.msg}</h4></CardText>
      <Button color="success" onClick={this.startClock}>
        Pay Now
      </Button>
    </CardBody>
  </Card>
</div>
            
          </Col>
        </Row>

      </Container>
    );
  }
}
