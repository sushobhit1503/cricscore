import React from "react"
import { Link } from "react-router-dom"

class Overs extends React.Component {
    render() {
        return (
            <div>
                <table border>
                    <th>
                        <tr>
                            <td>Over No.</td>
                            <td>All Balls</td>
                            <td>Total Runs</td>
                            <td>Total Wickets</td>
                            <td>Total Score</td>
                        </tr>
                    </th>
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

export default Overs