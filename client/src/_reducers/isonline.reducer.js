import { userConstants } from '../_constants';

let online = null


export function isOnline(state = online, action) {
  switch (action.type) {
    case userConstants.IS_ONLINE:
      return {
        online: online
      }
    default:
      return state
  }
}