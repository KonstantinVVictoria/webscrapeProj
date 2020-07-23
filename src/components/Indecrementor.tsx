import * as React from "react";
import { Component } from "react";
import State from "../State";
import App from "../App";

class Indecrementor extends React.Component {
  state = {};
  constructor(props: object) {
    super(props);
    Object.assign(this.state, State.toObject());
  }

  increment = () => {
    State.change(() => {
      State.number++;
    });
  };
  decrement = () => {
    State.change(() => {
      State.number--;
    });
  };

  render() {
    return (
      <React.Fragment>
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
