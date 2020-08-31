import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers'
import { userActions, alertActions } from '../_actions';
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
    const alert = useSelector(state => state.alert);

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        
<Grid textAlign="center" style={{ margin: "10px",backgroundColor:'rgb(230, 225, 225)'}} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
      <h2 as='h2' textAlign="center" className='reg-header' style={{Color:'rgb(82, 44, 0)'}}> 
           Teacher Login
        </h2>
        <Form name="form" onSubmit={handleSubmit}>
          <Segment stacked>

            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Enter your username..."
              name="username"
              label='Username'
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
              label='Password'
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


            <Button inverted style={{backgroundColor:'rgb(82, 44, 0)'}} fluid size="large">
              {loggingIn? <Loader active inline/>:
              'Login'}
            </Button><br/>
            <Grid textAlign='center' verticalAlign='middle'>
            
            {alert.message && <Message  size='large' color={alert.type}>
         <p>{alert.message}</p>
          </Message>}
             </Grid>


            
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    );
}

export { LoginPage };