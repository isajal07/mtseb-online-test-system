import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Menu,
    Segment,
    Container,
    Icon,
    Grid,
    Header,
    List,
    Divider,
    Image,
    Form,
    Input,
    Select,
    Button,
    Message
  } from "semantic-ui-react";
  import "./Style.css";
  import { history } from "../_helpers";

import { userActions, testActions,alertActions } from '../_actions';

import Test from './Test/Test'

import { NavBar, Footer } from '../_components'
import { StudentClock1 } from '../CreateTestPage/StartClock';

function SHomePage() {
    const [loading, setLoading] = useState(
        useSelector((state) => state.test.loading)
      );

      
      const alert = useSelector(state => state.alert);
    const {classNo, roll,name, role} = useSelector(state => state.authentication.user);
    const test = useSelector(state => state.test.testByClass[0])

  
    // const alert = useSelector(state => state.alert)
    const dispatch = useDispatch();
    //   console.log(test)

    useEffect(() => {
      dispatch(testActions.getTestByClass(classNo))
      setLoading(false);
    },[]);
    
    
    
   useEffect(()=>{
    dispatch(userActions.isOnline(true))
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
  });
   },[])


    
    
    return (
      <div className="styled-container">
        <NavBar name={name} classNo={classNo} roll={roll} />
        <Container className='AppContent'>
          <Grid className="grid-content"columns="equal" divided>
            <Grid.Row>
              <Grid.Column>
                <Segment className='segment-style'>
                {alert.message && <Message  size='large' color={alert.type}>
         <p>{alert.message}</p>
          </Message>}
                  {loading ? (
                    <p>Loading....</p>
                    ) : test ? (
                      test.starttest === true ? (
                        // <Test test={test} />
                        <Segment style={{fontSize:'16px'}}>
                        <Grid columns='equal' textAlign='center' stackable>



                          <Grid.Row>
                            <Grid.Column>
                            Subject:{test.subject} 
                            </Grid.Column>
                            <Grid.Column >
                            Teacher:{test.teacher}<br/>
                            Class:{test.classNo}                            </Grid.Column><Grid.Column>
                            Duration: 20 mins<br/>
                            Questions: {test.questions.length}
                            </Grid.Column><Grid.Column>
                              <StudentClock1/>
                            <Link to={{pathname:'/stest',state:{test}}}><Button color='green'>START TEST!</Button></Link>
                              
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                    
                      </Segment>

                    ) : (
                      <p>Test is ready! Please wait until teacher starts the test!</p>
                    )
                  ) : (
                    <p>No test at the moment.</p>
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Footer/>
      </div>
    );
}

export { SHomePage };