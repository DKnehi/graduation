export const actionType = {
  SET_ONECOURSE: "SET_ONECOURSE",
  SET_TYPECOURSE: "SET_TYPECOURSE",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case actionType.SET_ONECOURSE:
      return {
        ...state,
        oneCourse: action.oneCourse,
      };
    case actionType.SET_TYPECOURSE:
      return {
        ...state,
        typeCourse: action.typeCourse,
      };

    default:
      return state;
  }
};
export default reducer;
