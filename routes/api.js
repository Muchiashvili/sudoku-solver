'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const validDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', "."];

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if(!puzzle || !coordinate || !value) {
        res.send({ error: 'Required field(s) missing' });
        return;
      }
      let upperCoord = coordinate.toUpperCase();
      const puzzleArr = puzzle.split("");
      if(puzzle.length != 81) {
        res.send({ error: 'Expected puzzle to be 81 characters long' });
        return;
      } 
      
      if(/[^0-9.]/g.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle'});
        return;
      }

      if(puzzleArr[solver.CoordinateDecoder(upperCoord)] != ".") {
        res.send({ error: 'Invalid coordinate'});
        return;
      } 

      if(numbers.indexOf(parseInt(value)) == -1){
        res.send({ error: 'Invalid value' });
        return;
      }

      res.json(solver.checkAvaliable(puzzle, upperCoord, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if(!puzzle) {
        res.json({ error: 'Required field missing'});
        return;
      }
      if(puzzle.length != 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      if(/[^0-9.]/g.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle'});
        return;
      }
      let solvedString = solver.solve(puzzle);
      if(!solvedString) {
        res.json({ error: "Puzzle cannot be solved" });
      } else {
        res.json({ solution: solvedString });
      }
    });
};
