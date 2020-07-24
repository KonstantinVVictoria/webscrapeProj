//Only updates the states that are dependant on the property that was changed
function updateState(component, changed) {
  let mergeStateEntries = [];
  Object.entries(changed.state).forEach((value) => {
    if (Object.entries(component.state)[0][0] === value[0]) {
      mergeStateEntries.push(value);
    }
  });

  component.setState(Object.fromEntries(mergeStateEntries));
}
//Merges the state. Makes sure that the components only gets the properties that it uses
function mergeState(component, globalState) {
  let mergedStateEntries = [];
  if (!Object.keys(component.state).length) {
    return component.state;
  }

  Object.entries(globalState).forEach((value) => {
    if (Object.entries(component.state)[0][0] === value[0]) {
      mergedStateEntries.push(value);
    }
  });
  console.log(Object.fromEntries(mergedStateEntries));
  return Object.fromEntries(mergedStateEntries);
}

export { updateState, mergeState };
