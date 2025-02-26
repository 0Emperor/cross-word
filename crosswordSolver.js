
//create a function that englobes all the functions of the validation process.
function validation(puzzle, words) {
  if (!puzzle || !words) {
    return null
  }
  let cleanPuzzle = validatePuzzle(puzzle)
  return !!cleanPuzzle && validateEntries(puzzle, words) && wordValidation(words) ? cleanPuzzle : null
}
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
    if (i=="2" && words.length===2 && words[0].length===words[1].length) {
    return
    }
    sum += parseInt(i)
  }
  return sum === words.length
}
// Declare the initial function to run the program:
function crosswordSolver(puzzle, words) {
  if (typeof puzzle != "string" || !Array.isArray(words)) {
     
    console.log("Error");
    return
  }
  let cleanPuzzle = validation(puzzle, words)
  if (!cleanPuzzle) {
    console.log("Error");
    return
  }
  let res = crossWordAlgo(cleanPuzzle, words, clone(cleanPuzzle), [])

   let f =""
   res.length=== 1 ? f=join(res[0]) : f="Error"
   console.log(f);
   
}




// hadi will return true or false based on if 1 or 2 i there and the remaining to the left are 0 to a certainlimit
function isValidRow(two_dim_array, row_index, start_column) {
  // return false and 0 otherwise true and length
  let idx = start_column, len = 0
  if (!!two_dim_array[row_index][start_column - 1] && two_dim_array[row_index][idx - 1] != '.') {
    return [false, len]
  }
  while (idx < two_dim_array[row_index].length) {
    let char = two_dim_array[row_index][idx]
    if (char == ".") {
      break
    }
    len++
    idx++
  }
  return [true, len]
}

function clone(arr) {
  return arr.map((e) => { return [...e] })
}

// nfss lblan dyal li 9blha 
function isValidColumn(two_dim_array, start_row, column_index) {
  let len = 1
  let stop = start_row - - 1
  if (!!two_dim_array[start_row - 1] && two_dim_array[start_row - 1][column_index] != ".") {
    return [false, 0]
  }
  for (let i = stop; i < two_dim_array.length; i++) {
    if (i != stop && two_dim_array[i][column_index] == ".") {
      return [true, len]
    } else if (i != stop && i == (two_dim_array.length) - 1) {
      return [true, len + 1]
    }
    else if (two_dim_array[i][column_index] != ".") {
      len = len + 1
    } else if (i == stop && two_dim_array[i][column_index] == ".") {
      return [false, 0]
    }
  }
  return [false, 0]

}
//
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

function Check(potential) {
  if (!potential) {
    return
  }
  for (const element of potential) {
    if (element.join("").match(/(\d)/)) {
      return
    }
  }
  return true
}

function crossWordAlgo(puzzle, words, curent, solutions) {
  if (Check(curent)) {    
    solutions.push(curent)
    return solutions
  }
  for (const lineI in puzzle) {
    let line = puzzle[lineI]
    for (const charI in line) {
      let char = line[charI]
      if (char == "1" || char == "2") {
        for (const wordI in words) {
          if (isSafe("row", words[wordI], puzzle, lineI, charI)) {
            let res = placeWordRow(clone(puzzle), [...words], wordI, clone(curent), lineI, charI)
            if (res) {
              let potential = crossWordAlgo(res.puzzle, res.words, res.curent, clone(solutions))
              if (potential.length != 0) {
                if (isSafe("column", words[wordI], puzzle, lineI, charI)) {
               solutions.push(...potential)
                }else{
                return potential
              }}
            }
          }
          if (isSafe("column", words[wordI], puzzle, lineI, charI)) {
            let res = placeWordCol(clone(puzzle), [...words], wordI, clone(curent), lineI, charI)
            if (res) {
              let potential = crossWordAlgo(res.puzzle, res.words, res.curent, clone(solutions))
              if (potential.length != 0) {
                return potential
              }
            }
          }
        }
      }
    }
  }
  return solutions
}

function placeWordRow(puzzle, words, wordI, curent, rowI, colI) {
  puzzle[rowI][colI]--
  let i = 0
  while (colI < curent[0].length && i < words[wordI].length) {
    if (curent[rowI][colI] === "." || (curent[rowI][colI] != 0 && curent[rowI][colI] != 1 && puzzle[rowI][colI] != 2)) {
      if (curent[rowI][colI] != words[wordI][i]) {

        return null
      }
    }
    curent[rowI][colI] = words[wordI][i]
    i++
    colI++
  }
  words.splice(wordI, 1)
  return { puzzle, curent, words }
}
function join(w) {
  let res = ""
  for (const element of w) {
    res += element.join("") + "\n"
  }  
  return res
}

function placeWordCol(puzzle, words, wordI, curent, rowI, colI) {
  puzzle[rowI][colI]--
  let i = 0
  while (rowI < curent.length && i < words[wordI].length) {
    if (curent[rowI][colI] === "." || (curent[rowI][colI] != 0 && curent[rowI][colI] != 1 && puzzle[rowI][colI] != 1)) {
      if (curent[rowI][colI] != words[wordI][i]) {
        return null
      }
    }
    curent[rowI][colI] = words[wordI][i]
    i++
    rowI++
  }
  words.splice(wordI, 1)
  return { puzzle, curent, words }
}

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)
