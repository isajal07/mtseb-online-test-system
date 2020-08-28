import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'teal', //Green color
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'red',//Red color
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    case alertConstants.TEST_GIVEN:
      return{
        type: 'teal',
        message: action.message
      }

    default:
      return state
  }
}