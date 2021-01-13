import {combineReducers} from "redux";
import reMovie from "./movies/reducer";
import reFilters from "./filters/reducer";

const rootReducer = combineReducers({
      reMovie,
      reFilters
})

export default rootReducer