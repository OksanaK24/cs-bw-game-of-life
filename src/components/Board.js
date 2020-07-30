import React, { useState, useRef, useCallback} from "react"
import produce from "immer"

// Declaring how many rows and columns the grid will have + params that can be used a few times
const numRows = 25
const numColumns = 25
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

    const playingRef = useRef(playing)
    playingRef.current = playing

    const [clickable, setClickable] = useState(true)

    const [generation, setGeneration] = useState(1)
    const generationRef = useRef(generation)
    generationRef.current = generation

    // The function to make the cell alive or dead (onClick)
    const Cell = (i ,j) => {
        const newGrid = produce(grid, gridCopy => {
            if(clickable){
                gridCopy[i][j] = grid[i][j] ? 0 : 1
            }
            
        })
        setGrid(newGrid)
    }

    // Counting neighbors, so I can check how many are alive around certain cell
    const Neighbors = (g, i, j) => {
        let alive_neighbors = 0
        cell_neighbors.forEach(([x, y]) => {
            let r = i + x
            let c = j + y
            if (r >= 0 && r < numRows && c >= 0 && c < numColumns) {
                alive_neighbors += g[r][c]
            }
        })
        return alive_neighbors
    }

    const UpdatedGrid = useCallback(() => {
        if (!playingRef.current) {
          return
        }
    
        setGrid(g => {
          return produce(g, gridCopy => {
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numColumns; j++) {
                let neighbors = Neighbors(g, i, j)
                
    
                if (neighbors < 2 || neighbors > 3) {
                  gridCopy[i][j] = 0
                } else if (g[i][j] === 0 && neighbors === 3) {
                  gridCopy[i][j] = 1
                }
              }
            }
          })
        })

        let newGeneration = generationRef.current + 1
        setGeneration(newGeneration)
    
        setTimeout(UpdatedGrid, 100)
    }, [])

    // function onClick to play the game
    const PlayingGame = () => {
        setPlay(!playing)
        setClickable(!clickable)
        if(!playing){
            playingRef.current = true
            UpdatedGrid()
        }
    }

    return(
        <>
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
                            Cell(i, j)
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

            <button
                onClick={() => {
                    PlayingGame()
                }}
            >
                {!playingRef.current ? "Play Game" : "Stop Game"}
            </button>

            <div>
                Generation: {generationRef.current}
            </div>

            <button
                onClick={() => {
                    setGrid(Grid())
                }}
            >
                Clear
            </button>

        </>
    )
}