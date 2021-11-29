export const CHANGE_STRIKE = (strikers) => ({
    type: "CHANGE STRIKE",
    payload: strikers
})

export const CHANGE_BOWLER = (bowler) => ({
    type: "CHANGE BOWLER",
    payload: bowler
})

export const UPDATE_RUNS = (runs) => ({
    type: "UPDATE RUNS",
    payload: runs
})

export const WICKETS = (batsman) => ({
    type: "WICKET",
    payload: batsman
})

export const UPDATE_EXTRAS = () => ({
    type: "UPDATE EXTRAS",
    payload: 1
})

export const CHANGE_INNINGS = () => ({
    type: "CHANGE INNINGS",
    payload: 2
})