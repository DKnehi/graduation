export const actionType = {
  SET_ONECOURSE: "SET_ONECOURSE",
  SET_TYPECOURSE: "SET_TYPECOURSE",
  SET_SEARCH: "SET_SEARCH",
  SET_IDCOURSECARD: "SET_IDCOURSECARD",
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
    case actionType.SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case actionType.SET_IDCOURSECARD:
      return {
        ...state,
        idCourseCard: action.idCourseCard,
      };

    default:
      return state;
  }
};
export default reducer;
