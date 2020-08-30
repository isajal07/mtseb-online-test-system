import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage,SHomePage } from '../HomePage';
import { LoginPage, SLoginPage } from '../LoginPage';
import { RegisterPage, SRegisterPage } from '../RegisterPage';
import {LandingPage} from '../LandingPage'
import TestResult from '../HomePage/Test/TestResult'
import Test from '../HomePage/Test/Test'

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import './App.css'

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
            <div className='app'>
                    <Router history={history}>
                        <Switch>
                            <Route exact path='/' component={LandingPage}/>
                            <PrivateRoute exact path="/home" component={HomePage} />
                            <PrivateRoute exact path="/shome" component={SHomePage}/>
                            <PrivateRoute exact path="/stest" component={Test}/>
                            <PrivateRoute exact path='/result' component={TestResult}/>

                            <Route path="/login" component={LoginPage} />
                            <Route path="/slogin" component={SLoginPage}/>
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/sregister" component={SRegisterPage}/>
                            
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                    <Grid textAlign='center' verticalAlign='middle'>
            
                   {alert.message && <Message  size='large' color={alert.type}>
                <p>{alert.message}</p>
  </Message>}
                    </Grid>
            </div>
    );
}

export { App };