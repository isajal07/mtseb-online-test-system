import { testConstants } from '../_constants'

const initialState = { test: {}, message: {}, testByClass: {}, loading: true }

export function test(state = initialState, action) {


  switch (action.type) {
    case testConstants.CREATE_TEST:
      return {
        ...state,
        loading: false,
        test: action.payload
      }
    case testConstants.GET_TEST:
      return {
        ...state,
        loading: false,
        test: action.payload
      }
    case testConstants.DELETE_TEST:
      return {
        ...state,
        loading: false,
        test: state.test.filter(test => test.id != action.payload)
      }
    case testConstants.START_TEST:
      return {
        ...state,
        loading: false,
        startTest: action.payload
      }
    case testConstants.GET_TEST_BY_CLASS:
      return {
        ...state,
        loading: false,
        testByClass: action.payload
      }
    case testConstants.SUBMIT_TEST:

    default:
      return state
  }
}