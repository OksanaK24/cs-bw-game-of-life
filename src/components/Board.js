import React, { useState, useRef, useCallback} from "react"
import produce from "immer"
import Slider from "react-input-slider"

import cell_neighbors from "../utils/neighbors"
import {numRows, numColumns, cellWidth, cellHeight} from "../utils/board_params"

import Grid from "../utils/Grid_empty"
import RandomGrid from "../utils/Grid_random"

export default function Board(){

    const [rowAmount, setRowAmount] = useState(numRows)
    const rowRew = useRef(rowAmount)
    rowRew.current = rowAmount

    const [columnsAmount, setColumnsAmount] = useState(numColumns)
    const columnRef = useRef(columnsAmount)
    columnRef.current = columnsAmount

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

    const [speed, setSpeed] = useState(100)
    const speedRef = useRef(speed)
    speedRef.current = speed


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
            if (r >= 0 && r < rowRew.current && c >= 0 && c < columnRef.current) {
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
            for (let i = 0; i < rowRew.current; i++) {
              for (let j = 0; j < columnRef.current; j++) {
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
    
        setTimeout(updatedGrid, 10000/speedRef.current)
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
    const rowAndColumnChange = ({ x }) => {
        if(!playing){
            setRowAmount(x)
            setColumnsAmount(x)
            setGrid(Grid(x, x))
            setGeneration(1)
        }
    }


    return(
        <>
            <div 
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columnsAmount}, ${cellWidth})`,
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
                    setGeneration(1)
                }}
            >
                Clear
            </button>

            <button
                onClick={() => {
                    setGrid(RandomGrid(rowAmount, columnsAmount))
                    setGeneration(1)
                }}
            >
                Random Grid
            </button>

            <div>
                <h3>Change the amount of rows and columns</h3>
                <p> {rowAmount}, {columnsAmount} </p>
                <Slider
                    x={rowAmount}
                    xmin = {5}
                    xmax = {100}
                    xstep = {1}
                    onChange={rowAndColumnChange}
                />
            </div>

            <div>
                <h3>Speed</h3>
                <Slider
                    x={speed}
                    xmin = {10}
                    xmax = {1000}
                    xstep = {10}
                    onChange={({ x }) => setSpeed(x)}
                />
            </div>

        </>
    )
}