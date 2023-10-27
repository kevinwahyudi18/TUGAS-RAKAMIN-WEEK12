import * as React from 'react';
import "./App.css";
import { useState } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function selectSquare(index) {
    if (squares[index]) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderSquare(i) {
    return (
      <Button
        variant="outline"
        size="lg"
        width="60px"
        height="60px"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </Button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, calculateNextValue(squares));

  return (
    <Box textAlign="center" mt={10}>
      <Text mb={4}>{status}</Text>
      <Box d="flex" mb={2}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Box>
      <Box d="flex" mb={2}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Box>
      <Box d="flex" mb={4}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Box>
      <Button colorScheme="teal" onClick={restart}>
        Restart
      </Button>
    </Box>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
