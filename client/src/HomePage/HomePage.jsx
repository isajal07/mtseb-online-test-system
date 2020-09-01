import React from "react";
import {  useSelector } from "react-redux";
import { Segment, Container, Grid } from "semantic-ui-react";
import "./Style.css";
import { CreateTestPage } from "../CreateTestPage";
import ResultTable from "./ResultTable";
import OnlineTable from "./OnlineTable";
import { NavBar, Footer } from "../_components";

function HomePage() {
  const name = useSelector((state) => state.authentication.user.name);
  const role = useSelector((state) => state.authentication.user.role);
  const teacherId = useSelector((state) => state.authentication.user.id);
  const test = useSelector((state) => state.test.test[0]);

  console.log("from home", test);

  return (
    <div class="styled-container">
      <NavBar name={name} role={role} />

      <Container className="AppContent">
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <Segment>
                {" "}
                <CreateTestPage teacherId={teacherId} />{" "}
              </Segment>
              <Segment>
                <p>
                  {test ? (
                    <ResultTable test={test} />
                  ) : (
                    <p>No test results...</p>
                  )}
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5} textAlign="left">
              <Segment stacked={false}>
                <OnlineTable />
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
