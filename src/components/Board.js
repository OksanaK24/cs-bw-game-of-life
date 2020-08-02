import React, { useState, useRef, useCallback, useEffect} from "react"
import produce from "immer"
import Slider from "@material-ui/core/Slider"

import cell_neighbors from "../utils/neighbors"
import {numRows, numColumns, cellWidth, cellHeight} from "../utils/board_params"

import Grid from "../utils/Grid_empty"
import RandomGrid from "../utils/Grid_random"

export default function Board(){

    const [rowAmount, setRowAmount] = useState(numRows)
    const rowRef = useRef(rowAmount)
    rowRef.current = rowAmount

    const [columnsAmount, setColumnsAmount] = useState(numColumns)
    const columnsRef = useRef(columnsAmount)
    columnsRef.current = columnsAmount

    const [grid, setGrid] = useState(() => {
        return Grid(rowAmount, columnsAmount)
    })

    const [playing, setPlay] = useState(false)

    const playingRef = useRef(playing)
    playingRef.current = playing

    const [clickable, setClickable] = useState(true)

    const [generation, setGeneration] = useState(1)
    const generationRef = useRef(generation)
    generationRef.current = generation


    // The function to make the cell alive or dead (onClick)
    const cell = (i ,j) => {
        const newGrid = produce(grid, gridCopy => {
            if(clickable){
                gridCopy[i][j] = grid[i][j] ? 0 : 1
            }
            
        })
        setGrid(newGrid)
    }

    // Counting neighbors, so I can check how many are alive around certain cell
    const neighborsAmount = (g, i, j) => {
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

    const updatedGrid = useCallback(() => {
        if (!playingRef.current) {
          return
        }
    
        setGrid(g => {
          return produce(g, gridCopy => {
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numColumns; j++) {
                let neighbors = neighborsAmount(g, i, j)
    
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
    
        setTimeout(updatedGrid, 100)
    }, [])

    // function onClick to play the game
    const playingGame = () => {
        setPlay(!playing)
        setClickable(!clickable)
        if(!playing){
            playingRef.current = true
            updatedGrid()
        }
    }

    // changing the amount of rows and columns
    const rowAndColumnChange = (event, newAmount) => {
        setRowAmount(newAmount)
        setColumnsAmount(newAmount)
        setGrid(Grid(newAmount, newAmount))
    }


    return(
        <>
            <div 
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnsAmount}, ${cellWidth})`,
                // gridTemplateRows: `repeat(${rowRef.current}, ${cellHeight})`,
                gridColumnGap: 0,
                gridRowGap: 0,
            }} 
            >
                {grid.map((row, i) =>
                    row.map((col, j) => (
                        <div
                        key={`${i}${j}`}
                        onClick = {() => {
                            cell(i, j)
                        }}
                        style={{
                            width: cellWidth,
                            height: cellHeight,
                            backgroundColor: grid[i][j] ? "purple" : "yellow",
                            border: "0.5px solid gray",
                        }}
                        />
                    ))
                )}
            </div>

            <button
                onClick={() => {
                    playingGame()
                }}
            >
                {!playingRef.current ? "Play Game" : "Stop Game"}
            </button>

            <div>
                Generation: {generationRef.current}
            </div>

            <button
                onClick={() => {
                    setGrid(Grid(rowAmount, columnsAmount))
                }}
            >
                Clear
            </button>

            <button
                onClick={() => {
                    setGrid(RandomGrid(rowAmount, columnsAmount))
                }}
            >
                Random Grid
            </button>

            <div>
                <h3>Change the amount of rows and columns</h3>
                <Slider
                    value={rowAmount}
                    min={5}
                    step={1}
                    max={100}
                    onChange={rowAndColumnChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                />
            </div>

        </>
    )
}