import * as React from "react";
export default class State {
  static readonly vh: number = window.innerHeight / 100;
  static readonly vw: number = window.innerWidth / 100;
  static number: number = 0;

  static check = () => {
    console.log(Object.entries(State.prototype.constructor));
  };
  static toObject = () => {
    return Object.fromEntries(
      Object.entries(State.prototype.constructor).filter(
        (properties) => typeof properties[1] != "function"
      )
    );
  };

  static change = (callback: any) => {
    callback();
    document.dispatchEvent(
      new CustomEvent("stateChanged", {
        detail: { state: State.toObject() },
      })
    );
  };
}
