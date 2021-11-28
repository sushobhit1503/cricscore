import React from "react"
import "./Home.css"
import { connect } from "react-redux"
import illustration from "./illustration.png"
import { Link } from "react-router-dom"
import { firestore } from "./config"

class Play extends React.Component {
    state = {
        bowlerRuns: 0,
        bowlerWickets: 0,
        batsman1Runs: 0,
        batsman2Runs: 0,
        currentTeam: ""
    }

    componentDidMount() {

        const { summary, teams } = this.props
        firestore.collection(teams.team1 + teams.team2).doc("Summary").get().then(doc => {
            if (summary.currentInnings === 1)
                this.setState({ currentTeam: doc.data().Innings1 })
            else
                this.setState({ currentTeam: doc.data().Innings2 })
        })
    }
    render() {
        const { summary } = this.props
        // const panelUpdate = (points) => {
        //     switch (points) {
        //         case 
        //     }
        // }
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
                                <button style={{ margin: "5px" }} className="submit-button"> 0</button>
                                <button style={{ margin: "5px" }} className="submit-button"> 1</button>
                                <button style={{ margin: "5px" }} className="submit-button"> 2</button>
                                <button style={{ margin: "5px" }} className="submit-button"> 3</button>
                                <button style={{ margin: "5px" }} className="submit-button"> 4</button>
                                <button style={{ margin: "5px" }} className="submit-button"> 6</button>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> Wicket</button>
                                <button style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> No Ball</button>
                                <button style={{ backgroundColor: "red", margin: "5px" }} className="submit-button"> Wide</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button style={{ marginTop: "30px", marginBottom: "40px" }} className="submit-button">
                                    CHANGE BOWLER
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card">
                                <div>
                                    {summary.strikePlayer}
                                </div>
                                <div>
                                    *
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card" >
                            <div>{this.state.currentTeam}</div>
                            <div>
                                {summary.total} - {summary.wickets}</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card">
                            <div>
                                {summary.currentBowler}
                            </div>
                            <div>
                                {this.state.bowlerRuns} - {this.state.bowlerWickets}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="lower-card" >
                            <div>
                                {summary.nonStrikePlayer}
                            </div>
                            <div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="lower-card" >
                            <div>OVERS: {summary.overs}</div>
                            <div>RPO: {(summary.total / summary.overs)}</div>
                        </div>
                        <div className="lower-card" >
                            {summary.currentOver.map(ball => {
                                return (
                                    <div className="ball">
                                        {ball}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    summary: state.SummaryReducer,
    teams: state.TeamNameReducer
})

export default connect(mapStateToProps, null)(Play)