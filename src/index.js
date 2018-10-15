import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import PostsIndex from "./containers/posts_index";
import ReduxPromise from "redux-promise";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import PostsNew from "./containers/posts_new";

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(ReduxPromise))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/api/posts/new" component={PostsNew} />
        <Route path="/" component={PostsIndex} />
        <Route path="/api/posts" component={PostsIndex} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
