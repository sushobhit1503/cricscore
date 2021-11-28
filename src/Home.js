import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { firestore } from "./config"
import "./Home.css"

class Home extends React.Component {
    state = {
        team1: "",
        team2: "",
        overs: "",
        toss: ""
    }
    render() {
        const { teams, overs } = this.props
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const teamSave = () => {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(each => {
                firestore.collection(this.state.team1).doc(`Player ${each}`).set({
                    runsScored: 0,
                    ballsPlayed: 0,
                    zero: 0,
                    one: 0,
                    two: 0,
                    three: 0,
                    four: 0,
                    six: 0,
                    oversBowled: 0,
                    wickets: 0,
                    dotBalls: 0
                })
                firestore.collection(this.state.team2).doc(`Player ${each}`).set({
                    runsScored: 0,
                    ballsPlayed: 0,
                    zero: 0,
                    one: 0,
                    two: 0,
                    three: 0,
                    four: 0,
                    six: 0,
                    oversBowled: 0,
                    wickets: 0,
                    dotBalls: 0,
                    playerNumber: each
                })
            })
        }
        const overSave = (number) => {
            this.setState({ overs: number }, () => console.log(this.state))
        }
        const tossSave = (toss) => {
            this.setState({ toss: toss }, () => console.log(this.state))
        }
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>ENTER TEAM NAMES</h5>
                        <div>TEAM 1</div>
                        <input name="team1" value={this.state.team1} onChange={onChange} placeholder="Please enter team name" type="text"></input>
                        <div>TEAM 2</div>
                        <input name="team2" value={this.state.team2} onChange={onChange} placeholder="Please enter team name" type="text"></input>
                        <button onClick={teamSave} className="submit-button"> SAVE</button>
                    </div>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>SELECT NUMBER OF OVERS</h5>
                        <div style={{ display: "flex" }}>
                            <div onClick={() => overSave(50)} style={{ cursor: "pointer", backgroundColor: "grey" }} className="glass">50 OVERS</div>
                            <div onClick={() => overSave(20)} style={{ cursor: "pointer", backgroundColor: "grey" }} className="glass">20 OVERS</div>
                            <div onClick={() => overSave(10)} style={{ cursor: "pointer", backgroundColor: "grey" }} className="glass">10 OVERS</div>
                        </div>
                    </div>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>TOSS</h5>
                        <h6>{this.state.team1} chooses to: </h6>
                        <div style={{ display: "flex" }}>
                            <div onClick={() => tossSave("Batting")} style={{ cursor: "pointer", backgroundColor: "grey" }} className="glass">BATTING</div>
                            <div onClick={() => tossSave("Bowling")} style={{ cursor: "pointer", backgroundColor: "grey" }} className="glass">FIELDING</div>
                        </div>
                        <div>
                            {this.state.team2}{this.state.toss === "Bowling" ? <div> has to bat first</div> : <div>has to bowl first</div>}
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Link to="/play">
                        <button className="submit-button"> START PLAY</button>
                    </Link>
                </div>
            </div >
        )
    }
}

// const mapDispatchToProps = dispatch => ({
//     overSend: overs => dispatch(overSend(overs)),
//     teamSend: teams => dispatch(teamSend(teams))
// })

const mapStateToProps = state => ({
    teams: state.TeamNameReducer,
    overs: state.OversReducer
})

export default connect(mapStateToProps, null)(Home)