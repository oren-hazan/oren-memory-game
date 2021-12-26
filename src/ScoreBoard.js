import React from 'react'
import './score-board.css'


const ScoreBoard = () => {
    return (
        <div>
          <div className="score-board">
                <h1>משחק הזיכרון</h1>
            <ul>
            <li>תוצאה: <span>200</span></li>
            <li>שלב: <span>3</span></li>
            <li>זמן: <span>00:00</span></li>
            </ul>
          </div>
        </div>
    )
}

export default ScoreBoard;
