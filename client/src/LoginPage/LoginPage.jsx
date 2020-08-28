import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Loader,
  } from "semantic-ui-react";

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    return (
        
<Grid textAlign="center" style={{ marginTop: "10%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="teal" textAlign="center">
           Teacher Login
        </Header>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Enter your username..."
              name="username"
              value={username}
              onChange={handleChange}
              error={
                submitted && !username
                  ? { content: "Username is required!" }
                  : false
              }
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              type="password"
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


            <Button color="teal" fluid size="large">
              {loggingIn? <Loader active inline/>:
              'Login'}
            </Button>

            <Message>
              Not yet registered?{" "}
              <Link to="/register" color="teal">
               Click here to register your account.
              </Link>
            </Message>

            {/* <Message> */}
              {" "}
              <Link to="/" className="btn btn-link">
                ⬅️ BACK
              </Link>
            {/* </Message> */}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    );
}

export { LoginPage };