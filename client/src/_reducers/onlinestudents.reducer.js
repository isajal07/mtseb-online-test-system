import {userConstants} from '../_constants'

const initialState = { students:{}, loading: true}

export function getOnlineStudents(state = initialState, action) {
  
  switch(action.type) {
    case userConstants.GET_ONLINE_STUDENTS:
      return {
        ...state,
        students:action.payload,
        loading:false
      }
      default:
        return state
  }
}