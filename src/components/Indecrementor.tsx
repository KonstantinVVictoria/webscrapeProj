import * as React from "react";
import State from "../State";
import { updateState, mergeState } from "../StateManagement";
interface Props {
  id: string;
}
class Indecrementor extends React.Component<Props> {
  state = { number: 0 };
  constructor(props: Props) {
    super(props);

    State.number[props.id] = this.state.number;
    mergeState(this, State.toObject());
    document.addEventListener("stateChanged", (event: any) => {
      updateState(this, event.detail);
    });
  }

  increment = () => {
    State.change(() => {
      State.number[this.props.id]++;
    });
  };
  decrement = () => {
    State.change(() => {
      State.number[this.props.id]--;
    });
  };

  render() {
    console.log(State.number[this.props.id]);
    return (
      <React.Fragment>
        <p>{State.number[this.props.id]}</p>
        <div
          className="indecrementor-container"
          style={{ height: State.vh * 4, width: State.vh * 8 }}
        >
          <div
            className="incrementor"
            style={{ height: State.vh * 4, width: State.vh * 4 }}
            onMouseDown={this.increment}
          >
            +
          </div>
          <div
            className="decrementor"
            style={{ height: State.vh * 4, width: State.vh * 4 }}
            onMouseDown={this.decrement}
          >
            -
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Indecrementor;
