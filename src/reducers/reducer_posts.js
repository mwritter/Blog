import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST, EDIT_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "_id");

    case FETCH_POST:
      const post = action.payload.data;
      const newState = { ...state };
      newState[post._id] = post;
      return newState;

    case EDIT_POST:
      console.log("EDIT_POST reducer");

      return _.merge(state, action.payload);

    default:
      return state;
  }
}
