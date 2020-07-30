import React, { useState, useCallback, useEffect, useRef } from "react"

// Declaring how many rows and columns the grid will have + params that can be used a few times
const numRows = 5
const numColumns = 5
const cellWidth = "20px"
const cellHeight = "20px"

// operations for checking the neighbors
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

// Creating arr of column inside of arr of rows
const Grid = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows
}


export default function Board(){

    const [grid, setGrid] = useState(() => {
        return Grid()
    })

    const [playing, setPlay] = useState(false)

    // Counting neighbors, so I can check how many are alive around certain cell
    // const Neighbors = (i, j) => {
    //     let alive_neighbors = 0
    //     for (let r = i-1; r <= i+1; r++){
    //         for (let c = j-1; c <= j+1; j++){
    //             if (r >= 0 && r <= numRows && c >= 0 && c <= numColumns) {
    //                 alive_neighbors += grid[r][c]
    //             }
    //         }
    //     }
    //     return alive_neighbors
    // }

    const Neighbors = (i, j) => {
        let alive_neighbors = 0
        operations.forEach(([x, y]) => {
            const r = i + x;
            const c = j + y;
            if (r >= 0 && r < numRows && c >= 0 && c < numColumns && grid[r][c] === 1) {
                alive_neighbors += 1;
            }
            console.log(alive_neighbors, "neighbors inside of the loop")
        });
        return alive_neighbors
    }


    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    // The last version before produce
    // const updatedGrid = useCallback(() => {
    //     if(!playingRef){
    //         return
    //     }
    //     let newGrid = JSON.parse(JSON.stringify(grid))
    //     // console.log(newGrid, "newGrid before neighbors")
    //     // console.log(grid, "grid before neighbors")
    //     for (let i = 0; i < grid.length; i++){
    //         for (let j = 0; j < grid[i].length; j++){
    //             // console.log(grid, "grid inside of neighbors")
    //             // console.log(grid[i][j], "the cell inside of neighbors")
    //             // console.log(i, "the row")
    //             // console.log(j, "the column")
    //             let cell = grid[i][j]
    //             let neighbors = Neighbors(i, j)
    //             // console.log(neighbors, "inside of updatedGrid")
    //             if(cell === 1 && (neighbors > 3 || neighbors <2) ){
    //                 newGrid[i][j] = 0
    //                 // console.log("it was one, now zero")
    //             }else if(cell === 0 && neighbors === 3){
    //                 newGrid[i][j] = 1
    //                 // console.log("it was zero, now one")
    //             }else{
    //                 newGrid[i][j] = cell
    //             }
    //         }
    //     }
        
    //     // console.log(newGrid, "newGrid after neighbors")
        
    //     setGrid(newGrid)
    //     // console.log(grid, "grid after neighbors")
    //     setTimeout(updatedGrid, 1000)
    // }, [])

    const UpdatedGrid = () => {
        const newGrid = [...grid]
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid[i].length; j++){
                // let alive_neighbors = 0
                // for (let r = i-1; r <= i+1; r++){
                //     for (let c = j-1; c <= j+1; j++){
                //         if (r >= 0 && r <= numRows && c >= 0 && c <= numColumns) {
                //             alive_neighbors += grid[r][c]
                //         }
                //     }
                // }
                // operations.forEach(([x, y]) => {
                //         const r = i + x;
                //         const c = j + y;
                //         if (r >= 0 && r < numRows && c >= 0 && c < numColumns) {
                //             alive_neighbors += grid[r][c];
                //         }
                //     });
                // Neighbors(i,j)
                // console.log(alive_neighbors, "alive neighbors")
                console.log(i, "the cell i")
                console.log(j, "the cell j")
                let neighbors = Neighbors(i, j)
                console.log(neighbors, "neighbors")
                if (grid[i][j] === 1 && (neighbors   > 3 || neighbors < 2) ) {
                    newGrid[i][j] = 0
                    // console.log(neighbors)
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    newGrid[i][j] = 1
                    // console.log(alive_neighbors)
                }
            }
        }
        setGrid(newGrid)
        // setTimeout(UpdatedGrid, 100); 
    }

    // console.log(grid)

    return(
        <>
            <button
                onClick={() => {
                    setPlay(!playing)
                    // console.log(playing)
                    // if(playing){
                        UpdatedGrid()
                    // }
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
        </>
    )
}