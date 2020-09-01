import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Divider,
  Form,
  Button,
  Input,
  Loader,
  Grid,
  Segment,
} from "semantic-ui-react";

import { testActions, userActions } from "../_actions";
import Questions from "./Questions";

import "./Style.css";

const CreateTestPage = ({ teacherId }) => {
  const [inputs, setInputs] = useState({
    subject: "",
    classNo: "",
  });

  const [hello, setHello] = useState("hello"); //Helper dummy constant to change the state.

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(
    useSelector((state) => state.test.loading)
  );
  const { subject, classNo } = inputs;
  const dispatch = useDispatch();

  const test = useSelector((state) => state.test.test[0]);

  useEffect(() => {
    updateState();
  }, [hello]);

  //Helper dummy function to update the state
  const updateState = () => {
    dispatch(testActions.getTest(teacherId));
    setLoading(false);
  };

  const handleTestChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleCreateTest = (e) => {
    // e.preventDefault();
    setSubmitted(true);
    if (subject && classNo) {
      setHello("hi");
      dispatch(testActions.createTest(subject, classNo));
      updateState();
    }
  };

  const TestForm = () =>
    test ? (
      <p>Loading...</p>
    ) : (
      <>
        <h2>Create Test</h2>
        <Divider width />
        <Form name="form" onSubmit={handleCreateTest}>
          <Form.Group>
            <Form.Input
              size="small"
              onChange={handleTestChange}
              name="subject"
              value={subject}
              label="Subject name:"
              placeholder="Enter the subject name here..."
              error={
                submitted && !subject
                  ? { content: "Subject name is required!" }
                  : false
              }
            />
            <Form.Input
              onChange={handleTestChange}
              name="classNo"
              value={classNo}
              label="Class:"
              placeholder="Enter the class here..."
              error={
                submitted && !classNo
                  ? { content: "Class is required!" }
                  : false
              }
            />
          </Form.Group>
          <Button
            className="create-test-button"
            style={{ marginTop: "10px" }}
            type="submit"
            color="teal"
          >
            Create Test
          </Button>
        </Form>
      </>
    );

  return (
    <>
      {test ? <Questions test={test} updateState={updateState} /> : TestForm()}
    </>
  );
};

export { CreateTestPage };
