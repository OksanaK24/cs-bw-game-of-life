import React, { useState, useRef, useCallback} from "react"
import produce from "immer"
import "../styling.css"

import cell_neighbors from "../utils/neighbors"
import { size } from "../utils/board_params"

import Grid from "../utils/Grid_empty"
import RandomGrid from "../utils/Grid_random"

import Tree1 from "../images/tree1.png"
import Tree2 from "../images/tree2.png"
import Tree3 from "../images/tree3.png"
import Tree4 from "../images/tree4.png"

export default function Board(){

    const [gridSize, setGridSize] = useState(size)
    const gridSizeRef = useRef(gridSize)
    gridSizeRef.current = gridSize

    // const [cellDim, setCellDim] = useState(parseInt(`${gridWidth}/${gridSizeRef.current}`))
    const [cellWidth, setCellWidth] = useState("20px")
    const [cellHeight, setCellHeight] = useState("20px")


    const [grid, setGrid] = useState(() => {
        return Grid(size)
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

    const [image, setImage] = useState(1)


    // The function to make the cell alive or dead (onClick)
    const cell = (i ,j) => {
        const newGrid = produce(grid, gridCopy => {
            if(clickable){
                gridCopy[i][j] = grid[i][j] ? 0 : 1
            }
            
        })
        setGrid(newGrid)
    }
    
    // ======================================================================
    // ==================== ALGORITHM TO COUNT NEIGHBORS ====================
    // ======================================================================

    // Counting neighbors, so I can check how many are alive around certain cell
    const neighborsAmount = (g, i, j) => {
        let alive_neighbors = 0
        cell_neighbors.forEach(([x, y]) => {
            let r = i + x
            let c = j + y
            if (r >= 0 && r < gridSizeRef.current && c >= 0 && c < gridSizeRef.current) {
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
            for (let i = 0; i < gridSizeRef.current; i++) {
              for (let j = 0; j < gridSizeRef.current; j++) {
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
        setImage(newGeneration)
    
        setTimeout(updatedGrid, 10000/speedRef.current)
    }, [])

    // ============================================================
    // ==================== ON CLICK FUNCTIONS ====================
    // ============================================================

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
    const gridChange = (e) => {
        let x = parseInt(e.target.value)
        if(!playing){
            setGridSize(x)
            setGrid(Grid(x))
            setGeneration(1)
            if(x <= 25){
                setCellHeight("20px")
                setCellWidth("20px")
            }else if(x > 25 && x <= 50){
                setCellHeight("15px")
                setCellWidth("15px")
            }else if(x > 50 && x < 75){
                setCellHeight("10px")
                setCellWidth("10px")
            }else{
                setCellHeight("7px")
                setCellWidth("7px")
            }
        }
    }

    const settingImage = () => {
        if (image < 50){
          return <div className="fade-in" ><img src={Tree1} alt="tree1"/></div>
        } else if (image > 50 && image < 100) {
          return <div className="fade-in" ><img src={Tree2} alt="tree2"/></div>
        }else if (image > 100 && image < 200) {
          return <div className="fade-in" ><img src={Tree3} alt="tree3"/></div>
        }else if (image > 200) {
          return <div className="fade-in" ><img src={Tree4} alt="tree4"/></div>
        }
    }

    return(
        <div className="board" >
            <div className="tree" >
                {settingImage()}
            </div>

            <div
                style={{
                    width: "35%"
                }}
            >
                <div 
                    style={{
                        display: "grid",
                        maxWidth: "50rem",
                        maxHeight: "50rem",
                        gridTemplateColumns: `repeat(${gridSizeRef.current}, ${cellWidth})`,
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
                                backgroundColor: grid[i][j] ? "#228B22" : "white",
                                border: "0.5px solid #663300",
                            }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div>

                <div className="generation" >
                    Generation: {generationRef.current}
                </div>

                <div className="all-buttons">
                    <button
                        className="buttons"
                        onClick={() => {
                            playingGame()
                        }}
                    >
                        {!playingRef.current ? "Play Game" : "Stop Game"}
                    </button>


                    <button
                        className="buttons"
                        onClick={() => {
                            setGrid(Grid(gridSize))
                            setGeneration(1)
                            setImage(1)
                        }}
                    >
                        Clear Grid
                    </button>

                    <button
                        className="buttons"
                        onClick={() => {
                            setGrid(RandomGrid(gridSize))
                            setGeneration(1)
                            setImage(1)
                        }}
                    >
                        Random Grid
                    </button>
                </div>

                <div className="inputs" >
                    <p className="generation" >Grid Size</p>
                    <input
                        className="slider"
                        type="range"
                        min="5"
                        max="100"
                        step="1"
                        onChange={(e) => gridChange(e)}
                    />
                    <p className="grid-size" > {gridSize} x {gridSize} </p>
                </div>
                

                <div className="inputs" >
                    <p className="generation" >Speed</p>
                    <input
                        className="slider"
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        onChange={(e) => {
                            setSpeed(parseInt(e.target.value))
                          }}
                    />

                </div>

            </div>

        </div>
    )
}