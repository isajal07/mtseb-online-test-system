import React,{useState,useReducer} from 'react'
import {Table, Icon} from 'semantic-ui-react'
import ReactTable, { ReactTableDefaults } from "react-table";
import _ from 'lodash'



function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

const ResultTable = ({test}) => {

  


  const [state, dispatch] = useReducer(exampleReducer, {
    column: null,
    data: test.answers,
    direction: null,
  })
  const { column, data, direction } = state

  return (
    <div>
    <h4>Subject:{test.subject}<br/>
    Class:{test.classNo}</h4>
    <Table sortable celled selectable  unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'roll' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'roll' })}
          >
            Roll no.
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
          >
            Students Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'score' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'score' })}
          >
            Marks
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {data.map(({ _id,roll, name, score }) => (
          <Table.Row key={_id}>
            <Table.Cell>{roll}</Table.Cell>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{score}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    {/* <div>Click here to download this test result.⬇</div> */}
    </div>
  )
  
}

export default ResultTable
