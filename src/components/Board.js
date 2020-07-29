import React, { useState } from "react"

// Declaring how many rows and columns the grid will have + params that can be used a few times
const numRows = 5
const numColumns = 5
const cellWidth = "20px"
const cellHeight = "20px"

// Creating arr of column inside of arr of rows
const Grid = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows
}

// creating data for counting neighbors
const cell_neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]


export default function Board(){

    const [grid, setGrid] = useState(() => {
        return Grid()
    })

    const [playing, setPlay] = useState(false)

    const Neighbors = (i, j) => {
        let alive_neighbors = 0
        cell_neighbors.forEach(([x, y]) => {
            let r = i + x;
            let c = j + y;
            if (r >= 0 && r < numRows && c >= 0 && c < numColumns) {
                alive_neighbors += grid[r][c];
            }
            // console.log(alive_neighbors, "neighbors inside of the loop")
        })
        // console.log(alive_neighbors, "final neighbors")
        return alive_neighbors
    }

    const updatedGrid = () => {
        let newGrid = Grid()
        // console.log(newGrid, "newGrid before neighbors")
        // console.log(grid, "grid before neighbors")
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid[i].length; j++){
                // console.log(grid, "grid inside of neighbors")
                // console.log(grid[i][j], "the cell inside of neighbors")
                // console.log(i, "the row")
                // console.log(j, "the column")
                let cell = grid[i][j]
                let neighbors = Neighbors(i, j)
                // console.log(neighbors, "inside of updatedGrid")
                if(cell === 1 && (neighbors > 3 || neighbors <2) ){
                    newGrid[i][j] = 0
                    // console.log("it was one, now zero")
                }else if(cell === 0 && neighbors === 3){
                    newGrid[i][j] = 1
                    // console.log("it was zero, now one")
                }else{
                    newGrid[i][j] = cell
                }
            }
        }
        
        // console.log(newGrid, "newGrid after neighbors")
        // console.log(grid, "grid after neighbors")
        setGrid(newGrid)
    }

    return(
        <>
            <button
                onClick={() => {
                    updatedGrid()
                }}
            >TRY</button>
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
                            // console.log(grid, "before clicking")
                            // console.log(grid[i][j], "the cell before clicking")
                            // console.log(i, "the row")
                            // console.log(j, "the column")
                            const newGrid = [...grid]
                            newGrid[i][j] = grid[i][j] ? 0 : 1
                            setGrid(newGrid)
                            // console.log(grid, "after clicking")
                            // console.log(grid[i][j], "the cell after clicking")                    
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
        </>
    )
}