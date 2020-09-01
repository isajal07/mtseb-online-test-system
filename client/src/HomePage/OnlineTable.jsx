import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";
import { List, Divider, Accordion, Icon, Button } from "semantic-ui-react";
import _ from "lodash";
const OnlineTable = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.getOnlineStudents.students);

  useEffect(() => {
    dispatch(userActions.getOnlineStudents());
  }, []);

  const refresh = () => {
    dispatch(userActions.getOnlineStudents());
  };

  return (
    <>
      <h3>
        {" "}
        Students Online{" "}
        <Button
          style={{ marginLeft: "5px" }}
          circular
          icon="refresh"
          onClick={refresh}
        />
      </h3>
      <Divider />
      {students.loading ? (
        <p>Loading...</p>
      ) : (
        <div type="⚫" style={{ color: "green" }}>
          {_.sortBy(students, "classNo", "roll").map((obj, i) => (
            <List bulleted>
              {obj.isOnline ? (
                <List.Item>
                  {obj.roll}. {obj.name} [{obj.classNo}]
                </List.Item>
              ) : (
                ""
              )}
            </List>
          ))}
        </div>
      )}
    </>
  );
};

export default OnlineTable;
