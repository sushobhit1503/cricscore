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
        const { teams, toss } = this.props
        firestore.collection(teams.team1).get().then(allDocs => {
            allDocs.forEach(player => {
                dummyRaw.push(player.data())
            })
            this.setState({ players: dummyRaw })
        })
    }
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>Bowler</th>
                        <th>Overs</th>
                        <th>Dot Balls</th>
                        <th>Runs Conceded</th>
                        <th>Wickets</th>
                        <th>Economy</th>
                    </tr>
                    {this.state.players.sort().map(eachPlayer => {
                        return (
                            <tr>
                                <td>Bowler {eachPlayer.playerNumber}</td>
                                <td>{eachPlayer.oversBowled}</td>
                                <td>{eachPlayer.dotBalls}</td>
                                <td>{eachPlayer.runsGiven}</td>
                                <td>{eachPlayer.wickets}</td>
                                <td>{(eachPlayer.runsGiven / eachPlayer.oversBowled)}</td>
                            </tr>
                        )
                    })}
                </table>
                <div>
                    <Link to="/play">
                        <button className="submit-button"> GO BACK TO PLAYING AREA</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teams: state.TeamNameReducer,
    toss: state.TossReducer
})

export default connect(mapStateToProps, null)(Bowling)