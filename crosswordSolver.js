
//create a function that englobes all the functions of the validation process.
function validation(puzzle, words) {
  if (!puzzle || !words) {
    return null
  }
  let cleanPuzzle = validatePuzzle(puzzle)
  return !!cleanPuzzle && validateEntries(puzzle, words) && wordValidation(words) ? cleanPuzzle : null
}


const puzzle = `2001
0..0
1000
0..0`
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
function isValidateRow(two_dim_array, row_index, start_column) {
  // return false and 0 otherwise true and length
  let stop = start_column + 1;
  let len = 1;
  console.log(two_dim_array.length - start_column)
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


let valid = validation(puzzle, words)
console.log("Row validation",isValidateRow(valid, 0, 3))

// nfss lblan dyal li 9blha 

function isValidColumn(two_dim_array, start_row, column_index) {
  let len = 1
  console.log("len of the columns",two_dim_array.length)
  let stop = start_row + 1
  console.log(two_dim_array.length - start_row)
  for (let i = stop; i < two_dim_array.length - start_row; i++) {
    if (i !== stop && two_dim_array[column_index][i] === ".") {
      return [true, len]
    } else if (i !== stop && i === (two_dim_array.length - start_row) - 1) {
      return [true, len + 1]
    }
    else if (two_dim_array[column_index][i] !== ".") {
      len = len + 1
    } else if (i === stop && two_dim_array[column_index][i] === ".") {
      console.log(two_dim_array[column_index][i])

      return [false, 0]
    }
  }
  return [false,0]

}
console.log("Column Validation:",isValidColumn(valid, 0, 0))

