import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Style.css";
import { history } from "../_helpers";

import { userActions, pdfActions, alertActions } from "../_actions";
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Loader,
} from "semantic-ui-react";

function SRegisterPage() {
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  const [user, setUser] = useState({
    name: "",
    classNo: "",
    roll: "",
    password: "",
    password2: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      user.name &&
      user.classNo &&
      user.roll &&
      user.password &&
      user.password2
    ) {
      setSubmitted(true);
      dispatch(userActions.sregister(user));
    }
  }

  if (alert.type === "teal") {
    dispatch(pdfActions.profileCard(user));
    history.push("/success");
  }

  return (
    <div className="registration">
      <Grid
        textAlign="center"
        style={{ marginTop: "10%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <h2
            as="h2"
            textAlign="center"
            className="reg-header"
            style={{ Color: "rgb(82, 44, 0)" }}
          >
            Student Registration
          </h2>
          <Form name="form" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                label="Full Name"
                iconPosition="left"
                placeholder="Enter your full name..."
                name="name"
                value={user.name}
                onChange={handleChange}
                error={
                  submitted && !user.name
                    ? { content: "Fullname is required!" }
                    : false
                }
              />
              <Form.Input
                fluid
                icon="user"
                label="Class"
                iconPosition="left"
                placeholder="Enter your class..."
                name="classNo"
                value={user.classNo}
                onChange={handleChange}
                error={
                  submitted && !user.classNo
                    ? { content: "Class is required!" }
                    : false
                }
              />
              <Form.Input
                fluid
                label="Roll No."
                icon="user"
                iconPosition="left"
                placeholder="Enter your roll..."
                name="roll"
                value={user.roll}
                onChange={handleChange}
                error={
                  submitted && !user.roll
                    ? { content: "Roll no. is required!" }
                    : false
                }
              />

              <Form.Input
                fluid
                label="Password"
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="Create your password..."
                name="password"
                value={user.password}
                onChange={handleChange}
                error={
                  submitted && !user.password
                    ? { content: "Password is required!" }
                    : false
                }
              />

              <Form.Input
                fluid
                label="Confirm Password"
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="Confirm your password..."
                name="password2"
                value={user.password2}
                onChange={handleChange}
                error={
                  submitted && !user.password2
                    ? { content: "Confirm password is required!" }
                    : false
                }
              />

              <Button
                inverted
                className="reg-button"
                style={{ backgroundColor: "rgb(82, 44, 0)" }}
                fluid
                size="large"
              >
                {registering && <Loader />}
                Register
              </Button>

              <Message>
                <p>
                  *Note: A pdf will be downloaded, containing all your
                  registration info after you click 'Register'.
                </p>
                Keep it safe and secure with you.
              </Message>

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
    </div>
  );
}

export { SRegisterPage };
