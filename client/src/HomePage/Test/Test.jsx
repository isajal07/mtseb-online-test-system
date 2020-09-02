import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Test.css";
import QuestionHeader from "./QuestionHeader";
import { Divider, Segment, Button, Message } from "semantic-ui-react";
import QuestionForm from "./QuestionForm";
import QuestionButtons from "./QuestionButtons";
import Endtest from "./Endtest";
import { testActions } from "../../_actions";
import { NavBar } from "../../_components";
import { history } from "../../_helpers";

export default function Test(props) {
  const { classNo, roll, name, role } = useSelector(
    (state) => state.authentication.user
  );
  const [loading, setLoading] = useState(
    useSelector((state) => state.test.loading)
  );
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(testActions.getTestByClass(classNo));
    setLoading(false);
  }, []);
  const test = props.history.location.state;
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [windowWidth, setWindowWidth] = useState(null);
  const [answers, setAnswers] = useState("");
  const [disabled, setDisabled] = useState(false);
  const questions = test.test.questions;

  const [quiz, setQuiz] = useState(questions);
  const testSubmitted = useSelector((state) => state.test.testSubmitted);
  const endQuiz = () => {
    setIsActive(false);
    console.log("ENDER QUIZ");
  };

  const incrementIndex = () => {
    setIndex(index + 1);
    console.log("increment");
    //    setDisabled(true)
  };

  const decrementIndex = () => {
    setIndex(index - 1);
    console.log("decrement");
  };

  const changeAnswers = (value, index) => {
    let tempArray = [...answers];
    tempArray[index] = value;

    setAnswers(tempArray);
  };

  const wrongAnswers = () => {
    const wrongAnswers = quiz.filter((item, index) => {
      return (
        item.correctAnswer !== answers[index] || item.correctAnswer === null
      );
    });
    return wrongAnswers;
  };

  //Datas to submit test after time up
  const testId = test.test.id;
  const total = test.test.questions.length;
  let wrongAns = wrongAnswers();
  let rightAns = quiz.length - wrongAns.length;
  let score = rightAns;

  let yourAns;

  //Handling the empty array if student did not attempt single questions, By assuming the answer 0.
  answers === "" ? (yourAns = 0) : (yourAns = answers.map((a) => a + 1));

  const teacher = test.test.teacher;
  const subject = test.test.subject;
  const rightAnswers = score;

  setTimeout(() => {
    dispatch(testActions.submitScore(testId, total, score));
    history.push({
      pathname: "/result",
      state: { teacher, subject, classNo, questions, rightAnswers, yourAns },
    });
  }, 480000);

  return (
    <>
      <NavBar name={name} classNo={classNo} roll={roll} />
      <div className="Question">
        {loading ? (
          <p>Loading...</p>
        ) : alert.message !== undefined ? (
          <center>
            <Button
              style={{ margin: "40px" }}
              inverted
              onClick={() => history.push("/shome")}
              color="brown"
              icon="left chevron"
              content="Go back"
            />
            {alert.message && (
              <Message size="large" color={alert.type}>
                <p>{alert.message}</p>
              </Message>
            )}
          </center>
        ) : (
          <Segment style={{ margin: "40px 40px", padding: "20px" }}>
            {isActive ? (
              <div>
                <QuestionHeader header={test.test} />
                <Divider />
                <QuestionForm
                  questions={quiz}
                  index={index}
                  answers={answers}
                  changeAnswers={changeAnswers}
                />
                <Divider />
                <QuestionButtons
                  index={index}
                  incrementIndex={incrementIndex}
                  decrementIndex={decrementIndex}
                  windowWidth={windowWidth}
                  questions={quiz}
                  endQuiz={endQuiz}
                  disabled={disabled}
                />
              </div>
            ) : null}

            {isActive === false ? (
              <div>
                <Endtest
                  wrongAnswers={wrongAnswers}
                  questions={quiz}
                  test={test}
                  yourAnswer={answers}
                />
              </div>
            ) : null}
          </Segment>
        )}
      </div>
    </>
  );
}
