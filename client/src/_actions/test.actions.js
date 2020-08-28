import { testConstants } from '../_constants'
import { alertActions } from './';
import { history } from '../_helpers';
import { authHeader } from '../_helpers'
import { userService } from '../_services';

export const testActions = {
  getTest,
  createTest,
  deleteTest,
  startTest,
  getTestByClass,
  submitScore,
  // radioDisable
}

//Action to get the the test by teachers Id (By teacher)
function getTest(teacherId){
  return async dispatch =>{
    userService.getTest(teacherId)
      .then(
        test => dispatch({
          type:testConstants.GET_TEST,
          payload:test
        },
        error =>{
          dispatch(alertActions.error(error.toString()));
        }
        )
      )
  }
}
//Action to get the test by class(by student)
function getTestByClass(classNo){
  return async dispatch =>{
    userService.getTestByClass(classNo)
      .then(
        test => dispatch({
          type:testConstants.GET_TEST_BY_CLASS,
          payload:test
        },
        error =>{
          dispatch(alertActions.error(error.toString()));
        }
        )
      ).catch(error=>dispatch(alertActions.testGiven(error.toString())))
      
  }
}

//Action to create test by teacher
function createTest(subject,classNo) {
  return async dispatch => {
    userService.createTest(subject,classNo)
      .then(
        test=>
        dispatch({
          type:testConstants.CREATE_TEST,
           payload:test
          },
          error=>{
            dispatch(alertActions.error(error.toString()));
          })
          )

  }
}

//Action to delete test by id 
function deleteTest(testId) {
  return async dispatch =>{
    userService.deleteTest(testId)
      .then(
        message =>
          dispatch({
            type:testConstants.DELETE_TEST,
            payload:message
          }),
          error=>{
            dispatch(alertActions.error(error.toString()));
          }
      
      )
  }
}

//Action to start the test 
function startTest(classNo) {
  return async dispatch =>{
    userService.startTest(classNo)
      .then(
        test =>
          dispatch({
            type:testConstants.START_TEST,
            payload:test
          }),
          error=>{
            dispatch(alertActions.error(error.toString()));
          }
      
      )
  }
  
}


// Action to submit the test score
function submitScore(testId, score, total) {
  return async dispatch =>{
    userService.submitScore(testId, score, total)
      .then(
        test =>
          dispatch({
            type:testConstants.SUBMIT_TEST
          }),
          error=>{
            dispatch(alertActions.error(error.toString()));
          }
      
      )
  }
  
}

//Enable/Disable the 'next' button on the test
// function radioDisable(onChecked) {
//   return async dispatch => {
//     dispatch({
//       type:testConstants.RADIO_DISABLE,
//       payload: onChecked
//     })
//   }
// }