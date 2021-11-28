import React from "react"
import "./Home.css"
import illustration from "./illustration.png"
import { Link } from "react-router-dom"

class Play extends React.Component {
    render() {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ margin: "10px" }}>
                        <h5 style={{ textAlign: "center" }}>SCOREBOARD</h5>
                        <div className="glass">
                            <Link to="/batting-card"><button className="submit-button"> BATTING CARD</button></Link>
                            <Link to="/bowling-card"><button className="submit-button"> BOWLING CARD</button></Link>
                            <Link to="/over-card"><button className="submit-button"> OVERS CARD</button></Link>
                        </div>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <img alt="illustration" src={illustration} style={{ width: "400px", height: "400px" }} />
                    </div>
                    <div style={{ margin: "10px" }}>
                        <h5 style={{ textAlign: "center" }}>CONTROL PANEL</h5>
                        <div style={{ flexDirection: "row", flexWrap: "wrap", width: "400px" }} className="glass">
                            <button className="submit-button"> 0</button>
                            <button className="submit-button"> 1</button>
                            <button className="submit-button"> 2</button>
                            <button className="submit-button"> 3</button>
                            <button className="submit-button"> 4</button>
                            <button className="submit-button"> 6</button>
                            <button style={{ backgroundColor: "red" }} className="submit-button"> Wicket</button>
                            <button style={{ backgroundColor: "red" }} className="submit-button"> No Ball</button>
                            <button style={{ backgroundColor: "red" }} className="submit-button"> Wide</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex" }}>
                            <div className="lower-card">
                                <div>
                                    %PLAYER 1%
                                </div>
                                <div>
                                    %24*%
                                </div>
                            </div>
                        </div>
                        <div className="lower-card" >
                            %256-4%
                        </div>
                        <div className="lower-card" >
                            <div>
                                %BOWLER 1%
                            </div>
                            <div>
                                %24 - 3%
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="lower-card" >
                            <div>
                                %PLAYER 2%
                            </div>
                            <div>
                                %24*%
                            </div>
                        </div>
                        <div className="lower-card" >
                            %OVER 17% RPO 17
                        </div>
                        <div className="lower-card" >
                            1 W 0 2 W
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Play