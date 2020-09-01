import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers";
import { userActions, alertActions } from "../_actions";
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Loader,
} from "semantic-ui-react";

function SLoginPage() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  const [inputs, setInputs] = useState({
    classNo: "",
    roll: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { classNo, roll, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (classNo && roll && password) {
      dispatch(userActions.slogin(classNo, roll, password));
    }
  }

  return (
    <Grid
      textAlign="center"
      style={{ margin: "10px", backgroundColor: "rgb(230, 225, 225)" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 350 }}>
        <h2
          as="h2"
          textAlign="center"
          className="reg-header"
          style={{ Color: "rgb(82, 44, 0)" }}
        >
          Student Login
        </h2>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Class"
              placeholder="Enter your class..."
              name="classNo"
              value={classNo}
              onChange={handleChange}
              error={
                submitted && !classNo
                  ? { content: "Class is required!" }
                  : false
              }
            />
            <Form.Input
              fluid
              icon="user"
              label="Roll no."
              iconPosition="left"
              placeholder="Enter your roll..."
              name="roll"
              value={roll}
              onChange={handleChange}
              error={
                submitted && !roll
                  ? { content: "Roll no. is required!" }
                  : false
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              type="password"
              label="Password"
              placeholder="Enter your password..."
              name="password"
              value={password}
              onChange={handleChange}
              error={
                submitted && !password
                  ? { content: "Password is required!" }
                  : false
              }
            />

            <Button
              inverted
              style={{ backgroundColor: "rgb(82, 44, 0)" }}
              fluid
              size="large"
            >
              {loggingIn ? <Loader active inline /> : "Login"}
            </Button>
            <br />
            <Grid textAlign="center" verticalAlign="middle">
              {alert.message && (
                <Message size="large" color={alert.type}>
                  <p>{alert.message}</p>
                </Message>
              )}
            </Grid>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export { SLoginPage };
