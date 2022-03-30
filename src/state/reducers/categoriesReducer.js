const categoriesReducerDefaultState = {
  data: [],
  selectPdfData: [],
  name: "",
};

const categoriesReducer = (
  state = {
    data: [],
    selectPdfData: [],
    name: "",
  },
  action
) => {
  // console.log("redcucer called : ", action);
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        data: action.data,
      };
    case "SET_REDIRECT_LANDING_HOME":
      return {
        ...state,
        redirectlandinghome: action.data,
      };
    case "SET_HOME_LEVEL_DETAILS":
      return {
        ...state,
        homeleveldetails: action.data,
      };
    case "SET_ALL_TABS_CONTAINER":
      return {
        ...state,
        selectAllTabsContainers: action.data,
      };
    case "SET_IMG_DATA":
      return {
        ...state,
        selectImgData: action.data,
      };
    case "SET_VIDEO_DATA":
      return {
        ...state,
        selectVideodata: action.data,
      };
    case "SET_EVENTSAFFAIRS_DATA":
      return {
        ...state,
        selectEventsAffairsdata: action.data,
      };
    case "SET_PPT_DATA":
      return {
        ...state,
        selectPptData: action.data,
      };
    case "SET_PDF_DATA":
      return {
        ...state,
        selectPdfData: [...action.data],
      };
    case "SET_DOC_DATA":
      return {
        ...state,
        selectDocData: action.data,
      };
    case "SET_XLS_DATA":
      return {
        ...state,
        selectXlsData: action.data,
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.data,
      };
    case "SET_SELECTED_CATEGORY_PREV":
      return {
        ...state,
        selectedCategoryPrev: action.data,
      };
    case "SET_SELECTED_CATEGORY_LEVEL2":
      return {
        ...state,
        selectedCategoryLevel2: action.data,
      };
    case "SET_SELECTED_CATEGORY_LEVEL3":
      return {
        ...state,
        selectedCategoryLevel3: action.data,
      };
    case "REMOVE_CATEGORIES":
      return {
        ...state,
        data: state.data.filter((data) => data !== action),
      };
    case "CLEAR_CATEGORIES":
      return {
        ...state,
        data: [],
        name: "",
      };
    default:
      return state;
  }
};

export default categoriesReducer;
