// Creating arr of column inside of arr of rows
const RandomGrid = (numRows, numColumns) => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns), () => Math.round(Math.random())))
    }
    return rows
}

export default RandomGrid