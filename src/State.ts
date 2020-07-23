import * as React from "react";
export default class State {
  //Global Variables
  static readonly vh: number = window.innerHeight / 100;
  static readonly vw: number = window.innerWidth / 100;
  static number: any = {};
  //Checks the state
  static show = () => {
    return Object.entries(State.prototype.constructor);
  };
  //Coverts the static variables into a state object
  static toObject = () => {
    return Object.fromEntries(
      Object.entries(State.prototype.constructor).filter(
        (properties) => typeof properties[1] != "function"
      )
    );
  };
  //Changes the State
  static change = (callback: any) => {
    callback();
    document.dispatchEvent(
      new CustomEvent("stateChanged", {
        detail: { state: State.toObject() },
      })
    );
  };
}
