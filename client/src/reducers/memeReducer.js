import { UPLOAD_IMAGE } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case UPLOAD_IMAGE:
      return action.payload || false;
    default:
      return state;
  }
}
