import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { firestore } from "./config"

import "./Home.css"

class Batting extends React.Component {
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
                    {this.state.players.sort().map(eachPlayer => {
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

export default connect(mapStateToProps, null)(Batting)