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

function SLoginPage() {
    const [inputs, setInputs] = useState({
        classNo: '',
        roll:'',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { classNo,roll, password } = inputs;
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
        if (classNo && roll && password) {
            dispatch(userActions.slogin(classNo,roll, password));
        }
    }

    return (
        <Grid textAlign="center" style={{ marginTop: "10%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="teal" textAlign="center">
           Students Login
        </Header>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>
          <Form.Input
              fluid
              icon="user"
              iconPosition="left"
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
              <Link to="/sregister" color="teal">
               Click here to Log In
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

export { SLoginPage };