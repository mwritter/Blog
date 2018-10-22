import axios from "axios";
import _ from "lodash";

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delet_post";
export const CREATE_POST = "create-post";
export const EDIT_POST = "edit_post";

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

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}

export function editPost(id, values, callback) {
  if (!values.hasReferences || values.hasReferences === false)
    values = _.omit(values, "references");

  const request = axios
    .put(`${ROOT_URL}/posts/${id}`, values)
    .then(() => callback());

  return {
    type: EDIT_POST,
    payload: request
  };
}
