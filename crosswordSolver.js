
//create a function that englobes all the functions of the validation process.
function validation(puzzle, words) {
  if (!puzzle||!words) {
    return null
  }
  let cleanPuzzle = validatePuzzle(puzzle)
  return !!cleanPuzzle && validateEntries(puzzle, words) && wordValidation(words) ? cleanPuzzle : null
}


const puzzle = `...1...l...1....
..1000001000...
...0....0......
.1..1...0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`

const words = [
  'sun',
  'sunglasses',
  'Swimming',
  'Bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'saQQSDDDndals',
]

console.log(validation(puzzle,words));
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
  let cleanPuzzle =validation(puzzle,words)
  if (!cleanPuzzle) {
    return "Error"
  }
}
