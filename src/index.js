import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import * as serviceWorker from "./serviceWorker";
import State from "./State";

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
console.log(State.show());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
