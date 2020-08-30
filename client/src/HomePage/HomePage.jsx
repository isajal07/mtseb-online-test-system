import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions, testActions } from "../_actions";
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
} from "semantic-ui-react";
import "./Style.css";
import { history } from "../_helpers";
import { CreateTestPage } from "../CreateTestPage";
import ResultTable from "./ResultTable";
import OnlineTable from './OnlineTable'
import { NavBar, Footer } from "../_components";

function HomePage() {
  const users = useSelector((state) => state.users);
  const name = useSelector((state) => state.authentication.user.name);
  const role = useSelector((state) => state.authentication.user.role);
  const teacherId = useSelector((state) => state.authentication.user.id);
  const test = useSelector((state) => state.test.test[0]);

  const dispatch = useDispatch();

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  // const onlinee = useSelector(state => state.isOnline);
  //   console.log('online',onlinee)
  return (
    <div class="styled-container">
      <NavBar name={name} role={role} />

      <Container className="AppContent">
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={12}>
              <Segment>
                {" "}
                <CreateTestPage teacherId={teacherId} />{" "}
              </Segment>
              <Segment>
                <h2>Result Table</h2>
                <Divider/>
                <p>{test ? <ResultTable test={test} /> : <p>No test results...</p>}</p>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={4} textAlign='left'>
              <Segment stacked={false}>
              <h4>  Students Online </h4>
              <Divider/>  
                <OnlineTable/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export { HomePage };
