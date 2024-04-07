export const actionType = {
  SET_ONECOURSE: "SET_ONECOURSE",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_ONECOURSE:
      return {
        ...state,
        oneCourse: action.oneCourse,
      };

    default:
      return state;
  }
};
export default reducer;
