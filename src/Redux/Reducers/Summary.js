const INITIAL_STATE = {
    total: 0,
    wickets: 0,
    overs: 0,
    strikePlayer: "Player A",
    nonStrikePlayer: "Player B",
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
                nonStrikePlayer: action.payload.nonStrike
            }
        case "CHANGE BOWLER":
            return {
                ...state,
                currentBowler: action.payload.bowler
            }
        case "UPDATE RUNS":
            return {
                ...state,

            }
        default:
            return state
    }
}