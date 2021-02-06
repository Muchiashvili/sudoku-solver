const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
suite('UnitTests', () => {

    suite('solve logic test', function() {
        test('Logic handles a valid puzzle string of 81 characters', function(done) {
            let complete = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
            assert.equal(solver.solve(validPuzzle), complete);
            done();
        });
        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
            let invalid = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37g';
            assert.equal(solver.solve(invalid), false);
            done();
        });
        test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
            let invalid = '1.5..2';
            assert.equal(solver.solve(invalid), false);
            done();
        });
        test('Logic handles a valid row placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');
            let coord = 'B3';
            let value = '1';
            assert.equal(solver.checkRowPlacement(puzzleArr, coord, value).valid, true);
            done();
        });
        test('Logic handles an invalid row placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');
            let coord = 'B3';
            let value = '2';
            assert.equal(solver.checkRowPlacement(puzzleArr, coord, value).valid, false);
            done();
        });
        test('Logic handles a valid column placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');
            let coord = 'A1';
            let value = '7';
            assert.equal(solver.checkColPlacement(puzzleArr, coord, value).valid, true);
            done();
        });
        test('Logic handles an invalid column placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');
            let coord = 'A1';
            let value = '6';
            assert.equal(solver.checkColPlacement(puzzleArr, coord, value).valid, false);
            done();
        });
        test('Logic handles a valid region (3x3 grid) placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');      
            let coord = 'A1';
            let value = '6';
            let column = solver.checkColPlacement(puzzleArr, coord, value);
            let row = solver.checkRowPlacement(puzzleArr, coord, value);
            assert.equal(solver.checkRegionPlacement(puzzleArr, value, column.columnRegion, row.rowRegion), true);
            done();
        });
        test('Logic handles an invalid region (3x3 grid) placement', function(done) {
            let puzzleArr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'.split('');      
            let coord = 'A1';
            let value = '2';
            let column = solver.checkColPlacement(puzzleArr, coord, value);
            let row = solver.checkRowPlacement(puzzleArr, coord, value);
            assert.equal(solver.checkRegionPlacement(puzzleArr, value, column.columnRegion, row.rowRegion), false);
            done();
        });
        test('Valid puzzle strings pass the solver', function(done) {
            let complete = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
            assert.equal(solver.solve(validPuzzle), complete);
            done();
        });
        test('Invalid puzzle strings fail the solver', function(done) {
            let puzzle = '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.solve(puzzle), false);
            done();
        });
        test('Solver returns the the expected solution for an incomplete puzzzle', function(done) {
            let complete = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
            assert.equal(solver.solve(validPuzzle), complete);
            done();
        });
    })

});
