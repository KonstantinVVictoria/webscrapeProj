import * as React from "react";
import State from "./State";
import Indecrementor from "./components/Indecrementor";
import { updateState, mergeState } from "./StateManagement";

class App extends React.Component {
  state = { number: 0 };

  constructor(props: object) {
    super(props);
    this.state = mergeState(this, State.toObject());
    document.addEventListener("stateChanged", (event: any) => {
      updateState(this, event.detail);
    });
  }

  sum = () => {
    let sum: any = 0;
    Object.values(State.number).forEach((value) => (sum += value));
    return sum;
  };

  render() {
    return (
      <div className="App">
        <p>total: {this.sum()}</p>
        <Indecrementor key={"1"} id={"1"}></Indecrementor>
        <Indecrementor key={"2"} id={"2"}></Indecrementor>
      </div>
    );
  }
}

export default App;
