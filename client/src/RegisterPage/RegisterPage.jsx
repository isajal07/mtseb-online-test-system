import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions, pdfActions } from "../_actions";
import './Style.css'
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

function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    username: "",
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
    
    setSubmitted(true);
    if (user.name && user.username && user.password && user.password2) {
      dispatch(userActions.register(user));
      dispatch(pdfActions.teacherCard(user))
    }
  }

  return (
    <div className='registration'>
    <Grid textAlign="center" style={{ marginTop: "5%"}} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <h2 as='h2' textAlign="center" className='reg-header' style={{Color:'rgb(82, 44, 0)'}}> 
           Teacher Registration
        </h2>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              label="Full name"
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
              label="Username"
              icon="user"
              iconPosition="left"
              placeholder="Create your username...[Eg. john123]"
              name="username"
              value={user.username}
              onChange={handleChange}
              error={
                submitted && !user.username  
                  ? { content: "Username is required!" }
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
              label="Confirm password:"
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
            <Button inverted className="reg-button" style={{backgroundColor:'rgb(82, 44, 0)'}} fluid size="large">
              {registering && <Loader />}
              Register
            </Button>

            
            <Message>
            <p>*Note: A pdf will be downloaded, containing all your registration info after you click 'Register'.</p>
              Keep it safe and secure with you.
            </Message>

{/* Remove this BACK!!!!!!!!!!!!!!!! */}
              {" "}
              <Link to="/" className="btn btn-link">
                ⬅️ BACK
              </Link>

          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </div>
  );
}

export { RegisterPage };
