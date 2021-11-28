import logger from "redux-logger"
import { applyMiddleware, createStore, combineReducers } from "redux"
import { TeamName } from "./Reducers/Team-Name"
import { Overs } from "./Reducers/Overs"
import { Toss } from "./Reducers/Toss"

const rootReducer = combineReducers({
    TeamNameReducer: TeamName,
    OversReducer: Overs,
    TossReducer: Toss
})

const middleware = [];
if (process.env.NODE_ENV === "development") {
    middleware.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middleware))
export default store