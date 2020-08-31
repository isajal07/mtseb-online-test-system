import { questionConstants } from '../_constants'
import { alertActions } from './';
import { history } from '../_helpers';
import { authHeader } from '../_helpers'
import { userService } from '../_services';

export const questionActions = {
  createQuestion,
  deleteQuestion
}

//Action to create the question
function createQuestion(question,img,options,correctAnswer,desc){
  return async dispatch => {
    userService.createQuestion(question,img,options,correctAnswer,desc)
      .then(
        question=>
        dispatch({
          type:questionConstants.CREATE_QUESTION,
           payload:question
          },
          error=>{
            dispatch(alertActions.error(error.toString()));
          })
          )

  }
}

//Action to delete the question by the id.
function deleteQuestion(testId, queId){
  return async dispatch => {
    userService.deleteQuestion(testId,queId)
      .then(
        message =>
          dispatch({
            type:questionConstants.DELETE_QUESTION,
            payload:message
          }),
          error => {
            dispatch(alertActions.error(error.toSring()))
          }
      )
  }
}