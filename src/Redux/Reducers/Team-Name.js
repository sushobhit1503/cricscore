const INITIAL_STATE = {
    team1: "",
    team2: ""
}

export const TeamName = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TEAM ENTER":
            return {
                ...state,
                team1: action.payload.team1,
                team2: action.payload.team2
            }
        default:
            return state
    }
}