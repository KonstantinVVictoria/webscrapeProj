import * as React from "react";
import { Component } from "react";
import State from "./State";
import Indecrementor from "./components/Indecrementor";
import { updateState, mergeState } from "./StateManagement";

class App extends React.Component {
  state: any = { number: null };
  constructor(props: object) {
    super(props);
    this.state = mergeState(this, State.toObject());
    document.addEventListener("stateChanged", (event: any) => {
      updateState(this, event.detail);
    });
  }
  render() {
    return (
      <div className="App">
        <p>{State.number}</p>
        <Indecrementor></Indecrementor>
      </div>
    );
  }
}

export default App;
