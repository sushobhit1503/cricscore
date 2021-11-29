import React from "react"
import "./Home.css"
import { connect } from "react-redux"
import illustration from "./illustration.png"
import { Link } from "react-router-dom"
import { firestore } from "./config"
import firebase from "./config"
import { CHANGE_BOWLER, UPDATE_RUNS, CHANGE_STRIKE, WICKETS, UPDATE_EXTRAS, CHANGE_INNINGS } from "./Redux/Actions/Summary"

class Play extends React.Component {
    state = {
        currentTeam: "",
        currentBowlingTeam: "",
        strikeRuns: 0,
        nonStrikeRuns: 0,
        bowlerRuns: 0,
        bowlerWickets: 0,
        newBatsman: "",
        newBowler: ""
    }

    componentDidMount() {
        const { summary, teams } = this.props
        firestore.collection(teams.team1 + teams.team2).doc("Summary").get().then(doc => {
            if (summary.currentInnings === 1)
                this.setState({ currentTeam: doc.data().Innings1, currentBowlingTeam: doc.data().Innings2 }, () => console.log(this.state))
            else
                this.setState({ currentTeam: doc.data().Innings2, currentBowlingTeam: doc.data().Innings1 }, () => console.log(this.state))
        }).then(() => {
            firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).get().then(doc => {
                this.setState({ strikeRuns: doc.data().runsScored })
                firestore.collection(this.state.currentTeam).doc(summary.nonStrikePlayer).get().then(doc => {
                    this.setState({ nonStrikeRuns: doc.data().runsScored })
                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).get().then(doc => {
                        this.setState({ bowlerRuns: doc.data().runsConceded, bowlerWickets: doc.data().wickets })
                    })
                })
            })
        })
    }
    render() {
        const { summary, CHANGE_BOWLER, CHANGE_STRIKE, UPDATE_RUNS, WICKETS } = this.props
        const panelUpdate = (points) => {
            if (points === 1) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    one: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(1),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(1),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    }).then(() => {
                        CHANGE_STRIKE({
                            strike: summary.nonStrikePlayer,
                            nonStrike: summary.strikePlayer
                        })
                    })
                })
            }
            if (points === 3) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    three: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(3),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(3),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    }).then(() => {
                        CHANGE_STRIKE({
                            strike: summary.nonStrikePlayer,
                            nonStrike: summary.strikePlayer
                        })
                    })
                })
            }
            if (points === 2) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    two: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(2),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(2),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    })
                })
            }
            if (points === 0) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    zero: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(0),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(0),
                        ballsBowled: firebase.firestore.FieldValue.increment(1),
                        dotBalls: firebase.firestore.FieldValue.increment(1)
                    })
                })
            }
            if (points === 4) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    four: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(4),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(4),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    })
                })
            }
            if (points === 6) {
                UPDATE_RUNS(points)
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    six: firebase.firestore.FieldValue.increment(1),
                    ballsPlayed: firebase.firestore.FieldValue.increment(1),
                    runsScored: firebase.firestore.FieldValue.increment(6),

                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        runsConceded: firebase.firestore.FieldValue.increment(6),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    })
                })
            }
            if (points === 7 || points === 8) {
                UPDATE_EXTRAS()
            }
            else if (points === -1) {
                firestore.collection(this.state.currentTeam).doc(summary.strikePlayer).update({
                    ballsPlayed: firebase.firestore.FieldValue.increment(1)
                }).then(() => {
                    firestore.collection(this.state.currentBowlingTeam).doc(summary.currentBowler).update({
                        wickets: firebase.firestore.FieldValue.increment(1),
                        ballsBowled: firebase.firestore.FieldValue.increment(1)
                    })
                })
            }
            const { overs } = this.props
            if (summary.overs === overs.overs) {
                CHANGE_INNINGS()
            }
        }
        const onChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const changeBatsman = () => {
            WICKETS(this.state.newBatsman)
        }
        const changeBowler = () => {
            CHANGE_BOWLER({
                currentBowler: this.state.newBowler
            })
        }
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ margin: "10px" }}>
                        <div style={{ width: "300px", paddingBottom: "130px" }} className="glass">
                            <h5 style={{ textAlign: "center" }}>SCOREBOARD</h5>
                            <Link to="/batting-card"><button style={{ backgroundColor: "#008081", fontWeight: "bold", width: "300px" }} className="submit-button"> BATTING CARD</button></Link>
                            <Link to="/bowling-card"><button style={{ backgroundColor: "#008081", fontWeight: "bold", width: "300px" }} className="submit-button"> BOWLING CARD</button></Link>
                            {/* <Link to="/over-card"><button style={{ backgroundColor: "#008081", fontWeight: "bold", width: "300px" }} className="submit-button"> OVERS CARD</button></Link> */}
                        </div>
                    </div >
                    <div style={{ margin: "10px" }}>
                        <img alt="illustration" src={illustration} style={{ width: "350px", height: "350px" }} />
                    </div>
                    <div style={{ margin: "10px" }}>
                        <div className="glass">
                            <h5 style={{ textAlign: "center" }}>CONTROL PANEL</h5>
                            <div>
                                <button onClick={() => panelUpdate(0)} style={{ margin: "5px" }} className="submit-button"> 0</button>
                                <button onClick={() => panelUpdate(1)} style={{ margin: "5px" }} className="submit-button"> 1</button>
                                <button onClick={() => panelUpdate(2)} style={{ margin: "5px" }} className="submit-button"> 2</button>
                                <button onClick={() => panelUpdate(3)} style={{ margin: "5px" }} className="submit-button"> 3</button>
                                <button onClick={() => panelUpdate(4)} style={{ margin: "5px" }} className="submit-button"> 4</button>
                                <button onClick={() => panelUpdate(6)} style={{ margin: "5px" }} className="submit-button"> 6</button>
                            </div>
                            <div>
                                <button onClick={() => panelUpdate(-1)} style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> Wicket</button>
                                <button onClick={() => panelUpdate(8)} style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> No Ball</button>
                                <button onClick={() => panelUpdate(7)} style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> Wide</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <select style={{ marginTop: "20px" }} value={this.state.newBatsman} onChange={onChange} name="newBatsman" >
                                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].map(player => {
                                        return (
                                            <option value={`Player ${player}`}>{`Player ${player}`}</option>
                                        )
                                    })}
                                </select>
                                <button onClick={changeBatsman} style={{ marginTop: "10px", marginBottom: "20px" }} className="submit-button">
                                    CHANGE BATSMAN
                                </button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <select value={this.state.newBowler} onChange={onChange} name="newBowler" >
                                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].map(player => {
                                        return (
                                            <option value={`Player ${player}`}>{`Player ${player}`}</option>
                                        )
                                    })}
                                </select>
                                <button onClick={changeBowler} style={{ marginTop: "10px", marginBottom: "40px" }} className="submit-button">
                                    CHANGE BOWLER
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ display: "none", justifyContent: "space-between" }} className="lower-card">
                                <div>
                                    {summary.strikePlayer}
                                </div>
                                <div>
                                    {this.state.strikeRuns}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card" >
                            <div>{this.state.currentTeam}</div>
                            <div>
                                {summary.total} - {summary.wickets}</div>
                        </div>
                        <div style={{ display: "none", justifyContent: "space-between" }} className="lower-card">
                            <div>
                                {summary.currentBowler}
                            </div>
                            <div>
                                {this.state.bowlerRuns} - {this.state.bowlerWickets}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "none", justifyContent: "space-between" }} className="lower-card" >
                            <div>
                                {summary.nonStrikePlayer}
                            </div>
                            <div>
                                {this.state.nonStrikeRuns}
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card" >
                            <div>OVERS: {Math.floor(summary.overs / 6)}.{(summary.overs) % 6}</div>
                            <div>RPO: {(summary.total * 6 / summary.overs)}</div>
                        </div>
                        <div style={{ display: "none" }} className="lower-card" >

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    summary: state.SummaryReducer,
    teams: state.TeamNameReducer,
    overs: state.OversReducer
})

const mapDispatchToProps = dispatch => ({
    UPDATE_RUNS: runs => dispatch(UPDATE_RUNS(runs)),
    CHANGE_STRIKE: striker => dispatch(CHANGE_STRIKE(striker)),
    WICKETS: batsman => dispatch(WICKETS(batsman)),
    CHANGE_BOWLER: bowler => dispatch(CHANGE_BOWLER(bowler)),
    UPDATE_EXTRAS: () => dispatch(UPDATE_EXTRAS()),
    CHANGE_INNINGS: () => dispatch(CHANGE_INNINGS())
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)