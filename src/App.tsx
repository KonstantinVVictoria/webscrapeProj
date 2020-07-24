import * as React from "react";
import State from "./State";
import Indecrementor from "./components/Indecrementor";
interface IProps {}

interface IState {
  G_number?: number;
}
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { G_number: 0 };
    State.updates(this);
  }
  sum = () => {
    let sum: any = 0;
    Object.values(State.now.G_number).forEach((value) => (sum += value));
    return sum;
  };
  resetCounters = () => {
    State.change(() => {
      Object.keys(State.now.G_number).forEach((element: string) => {
        State.now.G_number[element] = 0;
      });
    });
  };
  render() {
    return (
      <div className="App">
        <p>total: {this.sum()}</p>
        <Indecrementor key={"1"} id={"1"}></Indecrementor>
        <Indecrementor key={"2"} id={"2"}></Indecrementor>{" "}
        <div onMouseDown={this.resetCounters}>reset</div>
      </div>
    );
  }
}

export default App;
