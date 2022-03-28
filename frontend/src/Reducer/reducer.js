/*
action - a json with:
- type (mandatory) - the type of the action
- payload (optional) - the data send with the action
*/

function reducer(state = { db: [] }, action) {
  switch (action.type) {
    case "LOAD":
      return { ...state, db: action.payload };

    case "ADD":
      return { ...state, users: [...state.users, action.payload] };

    default:
      return state;
  }
}

export default reducer;
