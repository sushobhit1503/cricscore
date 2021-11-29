const INITIAL_STATE = {
    total: 0,
    wickets: 0,
    overs: 0,
    strikePlayer: "Player A",
    nonStrikePlayer: "Player B",
    strikeRuns: 0,
    nonStrikeRuns: 0,
    currentBowler: "Player J",
    currentOver: [],
    currentInnings: 1,
    bowlerRuns: 0,
    bowlerWickets: 0
}

export const Summary = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CHANGE STRIKE":
            return {
                ...state,
                strikePlayer: action.payload.strike,
                nonStrikePlayer: action.payload.nonStrike,
                strikeRuns: action.payload.strickRuns
            }
        case "CHANGE BOWLER":
            return {
                ...state,
                currentBowler: action.payload.bowler
            }
        case "UPDATE RUNS":
            return {
                ...state,
                total: state.total + action.payload,
                overs: state.overs + 1
            }
        case "WICKET":
            return {
                ...state,
                wickets: state.wickets + 1,
                strikePlayer: action.payload
            }
        case "UPDATE EXTRAS":
            return {
                ...state,
                total: state.total + 1
            }
        case "CHANGE INNINGS":
            return {
                ...state,
                currentInnings: 2
            }
        default:
            return state
    }
}