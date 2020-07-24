import React, { useState } from "react";

// Declaring how many rows and columns the grid will have + params that can be used a few times
const numRows = 25
const numColumns = 25
const cellWidth = "20px"
const cellHeight = "20px"

export default function Board(){

    // Creating arr of column inside of arr of rows
    const Grid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numColumns), () => 0));
        }
        return rows;
    }

    const [grid, setGrid] = useState(() => {
        return Grid()
    })

    // console.log(grid)

    return(
        <div 
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numColumns}, ${cellWidth})`,
            gridColumnGap: 0,
            gridRowGap: 0,
          }} 
          >
            {grid.map((row, i) =>
                row.map((col, j) => (
                    <div
                    key={`${i}${j}`}
                    onClick = {() => {
                        // console.log(grid[i][j])
                        const newGrid = [...grid]
                        newGrid[i][j] = grid[i][j] ? 0 : 1
                        setGrid(newGrid)                    
                    }}
                    style={{
                        width: cellWidth,
                        height: cellHeight,
                        backgroundColor: grid[i][j] ? "blue" : "yellow",
                        border: "0.5px solid gray",
                    }}
                    />
                ))
            )}
        </div>
    )
}