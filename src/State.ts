import GlobalState from "./GlobalState";
export default class State {
  //Global Variables
  static readonly now: any = Object.fromEntries(
    Object.entries(GlobalState).filter(
      (properties) => typeof properties[1] != "function"
    )
  );

  //Coverts the static variables into a state object
  static toObject = () => {
    let globalState: any = new Object();
    return (globalState.state = Object.fromEntries(
      Object.entries(State.now).filter(
        (properties) => typeof properties[1] != "function"
      )
    ));
  };
  static show = () => {
    return State.toObject();
  };
  //Merges the state. Makes sure that the components only gets the properties that it uses
  static mergeState = (component: any, globalState: any): object => {
    let mergedStateEntries: any = [];

    if (!Object.keys(component.state).length) return component.state;

    Object.entries(globalState.state).forEach((value: any) => {
      if (Object.entries(component.state)[0][0] === value[0]) {
        mergedStateEntries.push(value);
      }
    });

    return Object.fromEntries(mergedStateEntries);
  };
  //Only updates the states that are dependant on the property that was changed
  static updateState = (component: any, changed: any) => {
    Object.entries(changed.state).forEach((value: any) => {
      if (Object.entries(component.state)[0][0] === value[0]) {
        State.mergeState(component, changed);
        let mergeStateEntries: any = [];
        Object.entries(changed.state).forEach((value: any) => {
          if (Object.entries(component.state)[0][0] === value[0]) {
            mergeStateEntries.push(value);
          }
        });

        component.setState(Object.fromEntries(mergeStateEntries));
      }
    });
  };
  //Attaches a lister to a component
  static updates = (component: any) => {
    document.addEventListener("stateChanged", (event: any) => {
      State.updateState(component, event.detail);
    });
  };
  static newProperty = (propertyName: string, property: any) => {
    State.now[propertyName] = property;
  };

  static removeProperty = (propertyName: string) => {
    delete State.now[propertyName];
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
