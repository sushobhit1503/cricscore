import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { firestore } from "./config"
import { Overs } from "./Redux/Actions/Overs"
import { TeamName } from "./Redux/Actions/TeamName"
import "./Home.css"

class Home extends React.Component {
    state = {
        team1: "",
        team2: "",
        overs: "",
        toss: ""
    }
    render() {
        const { Overs, TeamName } = this.props
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const teamSave = () => {
            var teamName1 = null
            var teamName2 = null
            if (this.state.toss === "batting") {
                teamName1 = this.state.team1
                teamName2 = this.state.team2
            }
            else {
                teamName1 = this.state.team2
                teamName2 = this.state.team1
            }
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"].map(each => {
                firestore.collection(this.state.team1).doc(`Player ${each}`).set({
                    runsScored: 0,
                    ballsPlayed: 0,
                    runsConceded: 0,
                    zero: 0,
                    one: 0,
                    two: 0,
                    three: 0,
                    four: 0,
                    six: 0,
                    ballsBowled: 0,
                    wickets: 0,
                    dotBalls: 0,
                    playerNumber: each
                })
                firestore.collection(this.state.team2).doc(`Player ${each}`).set({
                    runsScored: 0,
                    ballsPlayed: 0,
                    zero: 0,
                    one: 0,
                    runsConceded: 0,
                    two: 0,
                    three: 0,
                    four: 0,
                    six: 0,
                    ballsBowled: 0,
                    wickets: 0,
                    dotBalls: 0,
                    playerNumber: each
                })
            })
            firestore.collection(this.state.team1 + this.state.team2).doc("Summary").set({
                Extras: 0,
                Total1: 0,
                Total2: 0,
                overs: this.state.overs,
                Innings1: teamName1,
                Innings2: teamName2
            })
            Overs(this.state.overs)
            TeamName({
                team1: this.state.team1,
                team2: this.state.team2
            })
        }
        const overSave = (number) => {
            this.setState({ overs: number })
        }
        const tossSave = (toss) => {
            this.setState({ toss: toss })
        }
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex" }}>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>ENTER TEAM NAMES</h5>
                        <div style={{ fontSize: "20px" }}>TEAM 1</div>
                        <input class="input" name="team1" value={this.state.team1} onChange={onChange} placeholder="Please enter team name" type="text"></input>
                        <div style={{ fontSize: "20px" }}>TEAM 2</div>
                        <input class="input" name="team2" value={this.state.team2} onChange={onChange} placeholder="Please enter team name" type="text"></input>
                    </div>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>SELECT NUMBER OF OVERS</h5>
                        <div style={{ display: "flex" }}>
                            <div onClick={() => overSave(50)} style={{ cursor: "pointer", color: "white", backgroundColor: "#008081", fontSize: "18px", fontWeight: "bold", padding: "20px" }} className="glass hover">50 OVERS</div>
                            <div onClick={() => overSave(20)} style={{ cursor: "pointer", color: "white", backgroundColor: "#008081", fontSize: "18px", fontWeight: "bold", padding: "20px" }} className="glass hover">20 OVERS</div>
                            <div onClick={() => overSave(10)} style={{ cursor: "pointer", color: "white", backgroundColor: "#008081", fontSize: "18px", fontWeight: "bold", padding: "20px" }} className="glass hover">10 OVERS</div>
                        </div>
                        <div style={{ fontSize: "18px", marginTop: "30px", textAlign: "center" }}>
                            Format: {this.state.overs} overs
                        </div>
                    </div>
                    <div className="glass">
                        <h5 style={{ textAlign: "center" }}>TOSS</h5>
                        <div style={{ fontWeight: "bold", fontSize: "18px" }}>{this.state.team1} chooses to: </div>
                        <div style={{ display: "flex" }}>
                            <div onClick={() => tossSave("Batting")} style={{ cursor: "pointer", color: "white", backgroundColor: "#008081", fontSize: "18px", fontWeight: "bold", padding: "20px" }} className="glass hover">BATTING</div>
                            <div onClick={() => tossSave("Bowling")} style={{ cursor: "pointer", color: "white", backgroundColor: "#008081", fontSize: "18px", fontWeight: "bold", padding: "20px" }} className="glass hover">FIELDING</div>
                        </div>
                        <div style={{ fontSize: "18px", marginTop: "25px" }}>
                            {this.state.team2}{this.state.toss === "Bowling" ? <div> has to bat first</div> : <div>has to bowl first</div>}
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Link to="/play">
                        <button style={{ fontWeight: "bold", marginTop: "30px", fontSize: "25px" }} onClick={teamSave} className="submit-button"> START PLAY</button>
                    </Link>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    Overs: overs => dispatch(Overs(overs)),
    TeamName: teams => dispatch(TeamName(teams))
})

export default connect(null, mapDispatchToProps)(Home)