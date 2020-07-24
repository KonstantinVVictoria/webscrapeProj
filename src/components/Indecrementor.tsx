import * as React from "react";
import State from "../State";
interface IProps {
  id: string;
}

interface IState {
  G_number?: number;
}

class Indecrementor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { G_number: 0 };
    State.now.G_number[props.id] = this.state.G_number;
    State.updates(this);
  }

  increment = () => {
    let increment = () => {
      State.now.G_number[this.props.id]++;
    };
    State.change(() => {
      increment();
    });
  };

  decrement = () => {
    let decrement = () => {
      State.now.G_number[this.props.id]--;
    };
    State.change(() => {
      decrement();
    });
  };
  render() {
    return (
      <React.Fragment>
        <p>{State.now.G_number[this.props.id]}</p>
        <div
          className="indecrementor-container"
          style={{ height: State.now.G_vh * 4, width: State.now.G_vh * 8 }}
        >
          <div
            className="incrementor"
            style={{ height: State.now.G_vh * 4, width: State.now.G_vh * 4 }}
            onMouseDown={this.increment}
          >
            +
          </div>
          <div
            className="decrementor"
            style={{ height: State.now.G_vh * 4, width: State.now.G_vh * 4 }}
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
