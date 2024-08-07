import React, { Component } from "react";
import { Button, Grid, Segment, GridColumn } from "semantic-ui-react";
import "./Test.css";

class questionbuttons extends Component {


    buttons = (buttonType) => {
    return (
      <div className={"QuestionButtons"}>
        <Grid columns="equal" textAlign='center'>
          <Grid.Row>
          <Grid.Column mobile={16} tablet={1} computer={1}>
            <div className={"progressIndex"}>
              <p>
                {this.props.index + 1}/{this.props.questions.length}
              </p>
            </div>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column mobile={8} tablet={4} computer={5} textAlign='left'>
            {this.props.index !== 0 ? (
              <div className={"decrementIndex"}>
                <Button
                  onClick={this.props.decrementIndex}
                  size={buttonType}
                  labelPosition="left"
                  icon="left chevron"
                  content="Back"
                  className={"leftButton"}
                />
              </div>
            ) : null}
          </Grid.Column>


          <Grid.Column mobile={8} tablet={4} computer={5} >
            {this.props.index < this.props.questions.length - 1 ? (
              <div className={"incrementIndex"}>
                <Button
                  onClick={this.props.incrementIndex}
                  size={buttonType}
                  labelPosition="right"
                  icon="right chevron"
                  content="Next"
                  className="rightButton"
                />
              </div>
            ) : null}
            {this.props.index === this.props.questions.length - 1 ? (
              <div className={"incrementIndex"}>
                <Button
                  positive
                  onClick={this.props.endQuiz}
                  size={buttonType}
                  labelPosition="right"
                  icon="check"
                  content="End"
                  className="rightButton"
                  disabled={this.props.disabled}
                />
              </div>
            ) : null}
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };





  render() {
    return (
      <div>
        <div className={"hide-desktop"}>{this.buttons("mini")}</div>
        <div className={"hide-mobile"}>{this.buttons("large")}</div>
      </div>
    );
  }
}

export default questionbuttons;
