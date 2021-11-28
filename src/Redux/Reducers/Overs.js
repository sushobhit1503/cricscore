const INITIAL_STATE = {
    overs: 10
}

export const Overs = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "OVERS":
            return {
                ...state,
                overs: action.payload
            }
        default:
            return state
    }
}