import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import {NavBar, Footer} from '../../_components'
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
    Accordion,
    Message
  } from "semantic-ui-react";

  import './Test.css'
  import { history } from '../../_helpers';

const TestResult = (props) => {
  const {teacher, subject, classNo, questions, rightAnswers, yourAns} = props.history.location.state

  const [activeIndex, setActiveIndex] = useState(0)

  // useEffect(()=>{
    
  // },[])
  const [correctAnswer, setCorrectAnswer] = useState('')
  
  const name = useSelector((state) => state.authentication.user.name);
  const roll = useSelector((state) => state.authentication.user.roll);
  
  const handleClick = (e,titleProps) =>{
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }


    return (
      <div class="styled-container">
        <NavBar name={name} classNo={classNo} roll={roll} />
        <Container className="AppContent">
          <Grid columns="equal" divided>
            <Grid.Row>
              <Grid.Column >
                <Segment>
                  <Grid columns="equal" textAlign='center' stackable>
                    <Grid.Row>
                      <Grid.Column>
                      <Button
                  onClick={()=>history.push('/shome')}
                  // size={buttonType}
                  // labelPosition="left"
                  icon="left chevron"
                  content="Go back"
                  // className={"leftButton"}
                />
                      </Grid.Column>
                  <Grid.Column>
                  <h1><u>
                    Result: {rightAnswers}/{questions.length}
                   </u> 
                  </h1>
                  </Grid.Column>
                  <Grid.Column>
                   Click here to <br/> download your result.
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  <Grid columns="equal"textAlign='center' divided >
                    <Grid.Row>
                      <Grid.Column mobile={16} tablet={4} computer={4}>
                        <p>Sudent: {name}</p>
                      </Grid.Column>
                    
                      <Grid.Column mobile={16} tablet={4} computer={4}>
                        <div> Class: {classNo}</div>
                        <div> Roll no: {roll}</div>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={4} computer={4}>
                        <p> Teacher: {teacher}</p>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={4} computer={4}>
                        <p> Subject: {subject}</p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
            
                    <Accordion styled fluid>
                      <ol type="1">
                        {questions.map((obj, counter) => (
                          <li key={obj._id}>
                            <Accordion.Title
                              active={activeIndex === counter}
                              index={counter}
                              onClick={handleClick}
                            >
                              {obj.question}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === counter}>
                              <ol type="A">
                                {" "}
                                {obj.options.map((a, i) => (
                                  <div key={i}>
                                    <li>{a}</li>
                                  </div>
                                ))}
                              </ol>
                              {/* Converting the number into alphabet */}
                                  <br/>

                              {
                                ((String.fromCharCode(64 + yourAns[counter])) === (String.fromCharCode(64 + (obj.correctAnswer + 1)))) ?
                                <span style={{color:'green', fontStyle:'italic'}}> Your answer: {String.fromCharCode(64 + yourAns[counter])} </span>
                                :
                                <span style={{color:'red',fontStyle:'italic'}}> Your answer: {String.fromCharCode(64 + yourAns[counter])} </span>
  
                              }
                            
                              
                              <br />
                              <Message floating={false}>
                                <Message.Header>
                                  Correct Answer:{" "}
                                  {String.fromCharCode(
                                    64 + (obj.correctAnswer + 1)
                                  )}
                                </Message.Header>
                                <p>Description: {obj.desc}</p>
                              </Message>
                          
                            </Accordion.Content>
                          </li>
                        ))}
                      </ol>
                    </Accordion>
                 
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Footer />
      </div>
    );

}

export default TestResult;