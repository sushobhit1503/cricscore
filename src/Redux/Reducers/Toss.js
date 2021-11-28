const INITIAL_STATE = {
    team1: "BATTING"
}

export const Toss = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "BATTING":
            return {
                ...state,
                team1: action.payload
            }
        case "BOWLING":
            return {
                ...state,
                team1: action.payload
            }
        default:
            return state
    }
}