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

function SRegisterPage() {
    const [user, setUser] = useState({
        name: '',
        classNo: '',
        roll:'',
        password: '',
        password2:''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.name && user.classNo && user.roll && user.password && user.password2) {
          console.log(user)
            dispatch(userActions.sregister(user));
        }
    }

    return (
        <Grid textAlign="center" style={{ marginTop: "10%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" color="teal" textAlign="center">
           Students Registration
        </Header>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>
          <Form.Input
              fluid
              icon="user"
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
                <Button color="teal" fluid size="large">
              {registering && <Loader />}
              Register
            </Button>

            <Message>
              Already register?{" "}
              <Link to="/slogin" color="teal">
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

export { SRegisterPage };