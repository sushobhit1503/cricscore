import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { firestore } from "./config"

class Bowling extends React.Component {
    state = {
        players: []
    }
    componentDidMount() {
        let dummyRaw = []
        const { teams, summary } = this.props
        firestore.collection(teams.team1 + teams.team2).doc("Summary").get().then(doc => {
            if (summary.currentInnings === 1)
                this.setState({ currentTeam: doc.data().Innings2 })
            else
                this.setState({ currentTeam: doc.data().Innings1 })

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
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <table style={{ textAlign: "center" }}>
                    <tr>
                        <th>Bowler</th>
                        <th>Overs</th>
                        <th>Dot Balls</th>
                        <th>Runs Conceded</th>
                        <th>Wickets</th>
                        <th>Economy</th>
                    </tr>
                    {this.state.players.map(eachPlayer => {
                        return (
                            <tr>
                                <td>Bowler {eachPlayer.playerNumber}</td>
                                <td>{Math.floor(eachPlayer.ballsBowled / 6)}.{eachPlayer.ballsBowled % 6}</td>
                                <td>{eachPlayer.dotBalls}</td>
                                <td>{eachPlayer.runsConceded}</td>
                                <td>{eachPlayer.wickets}</td>
                                <td>{((eachPlayer.runsConceded * 6) / eachPlayer.ballsBowled)}</td>
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

export default connect(mapStateToProps, null)(Bowling)