import axios from "axios";
import _ from "lodash";

export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create-post";

const ROOT_URL = "https://blog-server-matthew-ritter.herokuapp.com/api";
export function createPost(values, callback) {
  if (!values.hasReferences || values.hasReferences === false)
    values = _.omit(values, "references");

  const request = axios
    .post(`${ROOT_URL}/posts`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}
