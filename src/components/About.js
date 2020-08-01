import React from "react"

export default function About(){
    return(
        <div>
            <h1>Welcome to the Conway's Game of Life</h1>
            <h3>The rules:</h3>
            <ol>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ol>
            <p>All rules you can find <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">here</a></p>
        </div>
    )
}