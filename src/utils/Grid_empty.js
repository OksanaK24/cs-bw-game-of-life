// Creating arr of column inside of arr of rows
const Grid = (numRows, numColumns) => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows
}

export default Grid