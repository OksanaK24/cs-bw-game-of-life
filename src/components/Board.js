import React, { useState } from "react";

// Declaring how many rows and columns the grid will have + params that can be used a few times
const numRows = 25
const numColumns = 25
const cellWidth = "20px"
const cellHeight = "20px"

// Creating arr of column inside of arr of rows
const Grid = () => {
    const row = []
    for (let r = 0; r < numRows; r++){
        const col = []
        for (let c = 0; c < numColumns; c++){
            col.push(<td key={`${r},${c}`}></td>)
        }
        row.push(<tr key={r}>{col}</tr>)
    }
    return <table>{row}</table>
}


export default function Board(){

    const [grid, setGrid] = useState(() => {
        return Grid()
    })
    
    // console.log(grid.props.children)


    return(
        <div 
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numColumns}, ${cellWidth})`,
            gridColumnGap: 0,
            gridRowGap: 0,
          }} 
          >
            {grid.props.children.map((row, i) =>
                row.props.children.map((col, k) => (
                    <div
                    key={`${i}-${k}`}
                    style={{
                        width: cellWidth,
                        height: cellHeight,
                        backgroundColor: "gray",
                        border: "1px solid black",
                    }}
                    />
                ))
            )}
        </div>
    )
}