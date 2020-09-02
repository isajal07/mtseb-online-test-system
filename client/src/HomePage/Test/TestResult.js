import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { NavBar, Footer } from '../../_components'
import {
  Segment,
  Container,
  Grid,
  Accordion,
  Message
} from "semantic-ui-react";

import './Test.css'
import { history } from '../../_helpers';

const TestResult = (props) => {
  const { teacher, subject, classNo, questions, rightAnswers, yourAns } = props.history.location.state
  const [activeIndex, setActiveIndex] = useState(0)

  const name = useSelector((state) => state.authentication.user.name);
  const roll = useSelector((state) => state.authentication.user.roll);

  useEffect(() => {
    history.goForward();
  }, [])

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }
  const testSubmitted = useSelector(state => state.test.testSubmitted)


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
                      <h1><u>
                        Result: {rightAnswers}/{questions.length}
                      </u>
                      </h1>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns="equal" textAlign='center' divided >
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
                          {
                            obj.image ? <img className='file-image' src={obj.image} /> : null
                          }<br />
                          <ol type="A">
                            {" "}
                            {obj.options.map((a, i) => (
                              <div key={i}>
                                <li>{a}</li>
                              </div>
                            ))}
                          </ol>
                          {/* Converting the number into alphabet */}
                          <br />

                          {
                            ((String.fromCharCode(64 + yourAns[counter])) === (String.fromCharCode(64 + (obj.correctAnswer + 1)))) ?
                              <span style={{ color: 'green', fontStyle: 'italic' }}> Your answer: {String.fromCharCode(64 + yourAns[counter])} </span>
                              :
                              <span style={{ color: 'red', fontStyle: 'italic' }}> Your answer: {String.fromCharCode(64 + yourAns[counter])} </span>

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