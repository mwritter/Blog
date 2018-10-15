import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import PostsIndex from "./containers/posts_index";

import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware())
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/api/posts" component={PostsIndex} />
        <Route path="/" component={PostsIndex} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
