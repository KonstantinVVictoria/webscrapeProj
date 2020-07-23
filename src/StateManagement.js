function updateState(component, changed) {
  let mergedStateEntries = [];
  Object.entries(changed.state).forEach((value) => {
    if (Object.entries(component.state)[0][0] === value[0]) {
      mergedStateEntries.push(value);
    }
  });

  component.setState(Object.fromEntries(mergedStateEntries));
}

function mergeState(component, globalState) {
  let mergedStateEntries = [];
  Object.entries(globalState).forEach((value) => {
    if (Object.entries(component.state)[0][0] === value[0]) {
      mergedStateEntries.push(value);
    }
  });
  return Object.fromEntries(mergedStateEntries);
}
export { updateState, mergeState };
