import React, { useState } from "react"
import "../vivify.min.css"

// Green colors: #228B22, #006600
// Brown colors: #663300

export default function About(){
    const [about, setAbout] = useState(false)
    const [buttonAbout, setButtonAbout] = useState(true)

    const [rules, setRules] = useState(false)
    const [readRules, setReadRules] = useState(true)

    const settingAbout = () => {
        setAbout(!about)
        setButtonAbout(!buttonAbout)
    }

    const settingRules = () => {
        setRules(!rules)
        setReadRules(!readRules)
    }

    return(
        <div>
            {/* <h1 >Welcome to the Conway's Game of Life</h1> */}
            <h1
                style={{
                    fontSize: "60px",
                    color: "#006600",
                    textShadow: "1px 1px 5px #663300",
                    textAlign: "center"
                }}
            >
                Conway's Game of Life
            </h1>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <div
                    style={{
                        width: "25%", 
                        height: "175px",
                        padding: "5px",
                        margin: "5px",
                        color: "#663300",
                        border: "1px solid white",
                        textAlign: "center",
                        cursor: "pointer" 
                    }}
                    onClick={settingAbout} 
                >
                    {buttonAbout && (
                        <p
                            style={{
                                fontSize: "40px",
                                fontWeight: "bold"
                            }}
                        >
                            About
                        </p>
                    )}

                    {about && (
                        <p 
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            The Game of Life, also known simply as Life, is a cellular automaton devised by 
                            the British mathematician John Horton Conway in 1970. <br/> It is a zero-player game, 
                            meaning that its evolution is determined by its initial state, requiring 
                            no further input. <br/> One interacts with the Game of Life by creating an initial 
                            configuration and observing how it evolves.
                        </p>
                    )}

                </div>

                <div
                    style={{
                        width: "25%", 
                        height: "175px",
                        padding: "5px",
                        margin: "5px", 
                        color: "#663300",
                        border: "1px solid white",
                        textAlign: "center",
                        cursor: "pointer"  
                    }}
                    onClick={settingRules} 
                >
                    {readRules && (
                        <h3
                            style={{
                                fontSize: "40px",
                            }}
                        >
                            Rules
                        </h3>
                    )}

                    {rules && (
                        <div
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            <p> 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation. <br/>
                            2. Any live cell with two or three live neighbours lives on to the next generation.<br/>
                            3. Any live cell with more than three live neighbours dies, as if by overpopulation.<br/>
                            4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
                            
                            <p>All rules you can find <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">here</a></p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}