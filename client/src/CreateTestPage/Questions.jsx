import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Button,
  Input,
  Grid,
  Segment,
  Dropdown,
  Modal,
  Accordion,
  Message,
  Icon,
  TextArea,
} from "semantic-ui-react";
import { testActions, questionActions, alertActions } from "../_actions";
import { history } from "../_helpers";
import "./Style.css";
import { TeacherClock } from "./StartClock";
import axios from "axios";

const Questions = ({ test }) => {
  const [inputs, setInputs] = useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    correctAnswer: "",
    desc: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { question, opt1, opt2, opt3, opt4, correctAnswer, desc } = inputs;
  const dispatch = useDispatch();
  const testId = test.id;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [start, setStart] = useState(test.starttest ? "STOP" : "START");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const deleteTest = () => {
    dispatch(testActions.deleteTest(testId));
    setOpen(false);

    dispatch(alertActions.success("Test deleted!"));
    window.location.reload(false);
  };

  const deleteQuestion = (queId) => {
    dispatch(questionActions.deleteQuestion(testId, queId));
    setTimeout(() => {
      dispatch(testActions.getTest(test.teacherid));
    }, 500);
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleDropDownChange = (event, result) => {
    const { name, value } = result || event.target;
    setInputs({ ...inputs, [name]: value });
  };

  //Acordian
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const submitCreateQuestion = () => {
    //Adding all the options in an options array
    const insert = (options, ...items) => options.push(...items);
    const options = [];
    insert(options, opt1, opt2, opt3, opt4);

    setSubmitted(true);

    if (question && options && correctAnswer && desc) {
      dispatch(
        questionActions.createQuestion(
          question,
          img,
          options,
          correctAnswer,
          desc
        )
      );

      setTimeout(() => {
        dispatch(testActions.getTest(test.teacherid));
        setInputs({
          question: "",
          opt1: "",
          opt2: "",
          opt3: "",
          opt4: "",
          correctAnswer: "",
          desc: "",
        });
      }, 500);
    }
  };
  const handleStartTest = () => {
    dispatch(testActions.startTest(test.classNo));
    if (start === "START") {
      setStart("STOP");
    } else {
      setStart("START");
    }
    //Code to start the countdown
  };

  const selectOption = [
    {
      key: "0",
      text: "A",
      value: "0",
    },
    {
      key: "1",
      text: "B",
      value: "1",
    },
    {
      key: "2",
      text: "C",
      value: "2",
    },
    {
      key: "3",
      text: "D",
      value: "3",
    },
  ];

  const onImageFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit

    const url = "https://api.imgur.com/3/image/";
    let formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipar",
        Authorization: "Client-ID 74e09b95b31f454",
      },
    };
    return axios.post(url, formData, config).then((response) => {
      setImg(response.data.data.link);
    });
  };

  const onChangeImage = (e) => {
    setFile(e.target.files[0]);
  };

  const viewResult = () => {
    history.push({ pathname: "/studentresult", state: { test } });
  };

  return (
    <div>
      <Grid columns="equal" padded>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <h3>
              {test.subject} [Class:{test.classNo}]
            </h3>
          </Grid.Column>
          <Grid.Column>
            <Modal
              trigger={
                <Button basic color="red">
                  Delete Test!
                </Button>
              }
              size="mini"
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
            >
              <Modal.Header>
                Are you sure you want to delete the test?
              </Modal.Header>
              <Modal.Actions>
                <Button onClick={() => setOpen(false)}>No</Button>
                <Button color="red" onClick={() => deleteTest()}>
                  Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Button
        fluid
        basic
        size="medium"
        corner="right"
        color="black"
        onClick={handleStartTest}
      >
        <p>Click to {start} the test!</p>
        <TeacherClock />
      </Button>

      <div style={{ textAlign: "center", marginTop: "10px" }}></div>

      <br />
      <h3> Questions:</h3>
      <Segment>
        {test.questions.length ? (
          test.questions.map((obj, counter) => (
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === counter}
                index={counter}
                onClick={handleClick}
              >
                {counter + 1}. {obj.question}
                <br />
                <Icon
                  color="red"
                  circular
                  name="trash alternate"
                  onClick={() => deleteQuestion(obj._id)}
                />
              </Accordion.Title>

              <Accordion.Content active={activeIndex === counter}>
                {obj.image ? (
                  <div>
                    <img className="file-image" src={obj.image} />
                  </div>
                ) : null}
                <br />
                <ol type="A">
                  {" "}
                  {obj.options.map((a, i) => (
                    <div key={i}>
                      <li>{a}</li>
                    </div>
                  ))}
                </ol>

                <br />
                <Message floating={false}>
                  <Message.Header>
                    Correct Answer:{" "}
                    {String.fromCharCode(64 + (obj.correctAnswer + 1))}
                  </Message.Header>
                  <p>Description: {obj.desc}</p>
                </Message>
              </Accordion.Content>
            </Accordion>
          ))
        ) : (
          <p>No questions added yet...</p>
        )}
      </Segment>

      <b> Add Questions:</b>
      <Form>
        <TextArea
          onChange={handleQuestionChange}
          name="question"
          value={question}
          placeholder="Enter the question here..."
          error={
            submitted && !question
              ? { content: "Question is required!" }
              : false
          }
        />
        <Segment>
          <form onSubmit={onImageFormSubmit}>
            <b>Image Upload: </b>
            <Input name="img" type="file" onChange={onChangeImage} />
            <br />
            {img ? <img className="file-image" src={img} /> : null} <br />
            <Button color="teal" type="submit">
              Upload
            </Button>
          </form>
        </Segment>

        <Form.Input
          onChange={handleQuestionChange}
          name="opt1"
          value={opt1}
          label="Option A:"
          placeholder="Enter Option A here..."
          error={
            submitted && !opt1 ? { content: "Option A is required!" } : false
          }
        />
        <Form.Input
          onChange={handleQuestionChange}
          name="opt2"
          value={opt2}
          label="Option B:"
          placeholder="Enter Option B here..."
          error={
            submitted && !opt2 ? { content: "Option B is required!" } : false
          }
        />
        <Form.Input
          onChange={handleQuestionChange}
          name="opt3"
          value={opt3}
          label="Option C:"
          placeholder="Enter Option C here..."
          error={
            submitted && !opt3 ? { content: "Option C is required!" } : false
          }
        />
        <Form.Input
          onChange={handleQuestionChange}
          name="opt4"
          value={opt4}
          label="Option D:"
          placeholder="Enter Option D here..."
          error={
            submitted && !opt1 ? { content: "Option D is required!" } : false
          }
        />

        <b>Correct answer:</b>
        <br />

        <Dropdown
          onChange={handleDropDownChange}
          options={selectOption}
          placeholder="Choose a correct option"
          selection
          value={correctAnswer}
          name="correctAnswer"
          error={
            submitted && !correctAnswer
              ? { content: "Correct Answer is required!" }
              : false
          }
        />
        <br />
        <br />
        <b>Description of the answer:</b>
        <br />
        <TextArea
          onChange={handleQuestionChange}
          name="desc"
          value={desc}
          label="Description of the anwer:"
          placeholder="Enter the description here..."
          error={
            submitted && !desc ? { content: "Description is required!" } : false
          }
        />
        <br />
        <br />
        <Button color="teal" onClick={submitCreateQuestion}>
          Create Question
        </Button>
      </Form>
    </div>
  );
};

export default Questions;
