
//create a function that englobes all the functions of the validation process.
function validation(puzzle, words) {
  if (!puzzle || !words) {
    return null
  }
  let cleanPuzzle = validatePuzzle(puzzle)
  return !!cleanPuzzle && validateEntries(puzzle, words) && wordValidation(words) ? cleanPuzzle : null
}


const puzzle = `2.00
0..0
2000
00.0`
const words = ['casa', 'alan', 'ciao', 'anta']



// Create a function to validate and split the input lines of the puzzle:
function SplitAndVAlidate(line) {
  let slc = []
  for (let val of line) {
    if (!val.match(/([0-2]|\.)/)) {
      return null
    }
    slc.push(val)
  }
  return slc
}

// Create a function to validate the puzzle:
function validatePuzzle(puzzle) {
  let result = []
  var spPuzzle = puzzle.split("\n")
  let i = spPuzzle[0].length
  for (const line of spPuzzle) {
    if (i != line.length) {
      return null
    }
    let spLine = SplitAndVAlidate(line)
    if (!spLine) {
      return null
    }
    result.push(spLine)
  }
  return result
}

// Create a function to validate the input words:
function wordValidation(array) {
  const set_of_words = new Set
  for (let word of array) {
    word = word.toLowerCase()
    if (!word.match(/[a-z]/gm)) {
      return false
    }
    set_of_words.add(word)
  }
  return set_of_words.size === array.length
}

// Create a function that checks that the number of words is the same as the number to be filled in the puzzle 
function validateEntries(puzzle, words) {
  let how_musch_numbers = /[1|2]/gm
  const numbers = puzzle.match(how_musch_numbers)
  let sum = 0
  for (let i of numbers) {
    sum += parseInt(i)
  }
  return sum === words.length
}
// Declare the initial function to run the program:
function crosswordSolver(puzzle, words) {
  let cleanPuzzle = validation(puzzle, words)
  if (!cleanPuzzle) {
    return "Error"
  }
}

console.log(validation(puzzle, words));

// hadi will return true or false based on if 1 or 2 i there and the remaining to the left are 0 to a certainlimit
function isValidRow(two_dim_array, row_index, start_column) {
  // return false and 0 otherwise true and length
  let stop = start_column + 1;
  let len = 1;
  for (let i = stop; i < two_dim_array[row_index].length - start_column; i++) {
    if (i !== stop && two_dim_array[row_index][i] === ".") {
      return [true, len]
    } else if (i !== stop && i === (two_dim_array.length - start_column) - 1) {
      return [true, len + 1]
    }
    else if (two_dim_array[row_index][i] !== ".") {
      len = len + 1
    } else if (i === stop && two_dim_array[row_index][i] === ".") {
      return [false, 0]
    }
  }
  return [false, 0]
}




// nfss lblan dyal li 9blha 
function isValidColumn(two_dim_array, start_row, column_index) {
  let len = 1
  let stop = start_row + 1
  for (let i = stop; i < two_dim_array.length - start_row; i++) {
    console.log("i:", i);

    if (i !== stop && two_dim_array[i][column_index] === ".") {
      return [true, len]
    } else if (i !== stop && i === (two_dim_array.length - start_row) - 1) {
      return [true, len + 1]
    }
    else if (two_dim_array[i][column_index] !== ".") {
      len = len + 1
    } else if (i === stop && two_dim_array[i][column_index] === ".") {
      console.log(two_dim_array[i][column_index])
      return [false, 0]
    }
  }
  return [false, 0]

}

function isSafe(type, word, two_dim_array, row_index, column_index) {
  switch (type) {
    case "row":
      const [ok, len] = isValidRow(two_dim_array, row_index, column_index)
      if (ok) return word.length === len
      else return false
    case "column":
      const [ok1, len1] = isValidColumn(two_dim_array, row_index, column_index)
      if (ok1) return word.length === len1
      else return false
    default:
      return false
  }
}





function crosswordSolver(){

}




let valid = validation(puzzle, words)
console.log("Row validation", isValidRow(valid, 0, 1))
console.log("Column Validation:", isValidColumn(valid, 0, 0))
console.log(isSafe("column","casa", valid, 0,0))

