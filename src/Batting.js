import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { firestore } from "./config"

import "./Home.css"

class Batting extends React.Component {
    state = {
        players: [],
        currentTeam: ""
    }
    componentDidMount() {
        let dummyRaw = []
        const { teams, summary } = this.props
        firestore.collection(teams.team1 + teams.team2).doc("Summary").get().then(doc => {
            if (summary.currentInnings === 1)
                this.setState({ currentTeam: doc.data().Innings1 })
            else
                this.setState({ currentTeam: doc.data().Innings2 })

            firestore.collection(this.state.currentTeam).get().then(allDocs => {
                allDocs.forEach(player => {
                    dummyRaw.push(player.data())
                })
                this.setState({ players: dummyRaw })
            })
        })
    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <table style={{ textAlign: "center" }}>
                    <tr>
                        <th>Batsman</th>
                        <th>Runs Scored</th>
                        <th>Balls Played</th>
                        <th>0s</th>
                        <th>1s</th>
                        <th>2s</th>
                        <th>3s</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>Strike Rate</th>
                    </tr>
                    {this.state.players.map(eachPlayer => {
                        return (
                            <tr>
                                <td>Batsman {eachPlayer.playerNumber}</td>
                                <td>{eachPlayer.runsScored}</td>
                                <td>{eachPlayer.ballsPlayed}</td>
                                <td>{eachPlayer.zero}</td>
                                <td>{eachPlayer.one}</td>
                                <td>{eachPlayer.two}</td>
                                <td>{eachPlayer.three}</td>
                                <td>{eachPlayer.four}</td>
                                <td>{eachPlayer.six}</td>
                                <td>{(eachPlayer.runsScored / eachPlayer.ballsPlayed) * 100}</td>
                            </tr>
                        )
                    })}
                </table>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <Link to="/play">
                        <button style={{ fontWeight: "bold", fontSize: "20px" }} className="submit-button"> GO BACK TO PLAYING AREA</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teams: state.TeamNameReducer,
    toss: state.TossReducer,
    summary: state.SummaryReducer
})

export default connect(mapStateToProps, null)(Batting)