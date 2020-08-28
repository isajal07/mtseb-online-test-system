import {questionConstants} from '../_constants'

const initialState = { question:{}, loading: true}

export function question(state = initialState, action) {
  
  switch(action.type) {
    case questionConstants.DELETE_QUESTION:
      return{
        ...state,
        loading:false,
        message:action.payload
      }
    case questionConstants.CREATE_QUESTION:
      return{
        ...state,
        loading:false,
        question:action.payload
      }
      default:
        return state
  }
}