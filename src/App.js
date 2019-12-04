import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row } from "./Components/Row";

const App = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const getEmptyPositions = board => {
    const emptyPositions = [];
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          emptyPositions.push([r, c]);
        }
      }
    }
    return emptyPositions;
  };

  const placeRandom = board => {
    const emptyPositions = getEmptyPositions(board);
    const randomCoordinate =
      emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    const randomNumber = randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  };

  const randomStartingNumber = () => {
    const startingNumbers = [2, 4];
    const randomNumber =
      startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  };

  const initializeBoard = () => {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    board = placeRandom(placeRandom(board));
    setBoard(board);
    setScore(0);
    setGameOver(false);
  };

  const rotateRight = matrix => {
    let result = [];

    for (let c = 0; c < matrix.length; c++) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.push(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  };

  const rotateLeft = matrix => {
    let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  };

  const boardMoved = (original, updated) => {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  };

  const moveUp = inputBoard => {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    let score = 0;
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }
    board = rotateLeft(board);
    return { board, score };
  };

  const moveRight = inputBoard => {
    let board = [];
    let score = 0;
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return { board, score };
  };

  const moveDown = inputBoard => {
    let rotatedRight = rotateRight(inputBoard);
    let board = [];
    let score = 0;

    // Shift all numbers to the left
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = rotateLeft(board);

    return { board, score };
  };

  const moveLeft = inputBoard => {
    let board = [];
    let score = 0;

    // Shift all numbers to the left
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    return { board, score };
  };

  const move = direction => {
    if (direction === "up") {
      const movedUp = moveUp(board);
      if (boardMoved(board, movedUp.board)) {
        const upWithRandom = placeRandom(movedUp.board);

        setBoard(upWithRandom);
        setScore(score + movedUp.score);
      }
    } else if (direction === "right") {
      const movedRight = moveRight(board);
      if (boardMoved(board, movedRight.board)) {
        const rightWithRandom = placeRandom(movedRight.board);

        setBoard(rightWithRandom);
        setScore(score + movedRight.score);
      }
    } else if (direction === "down") {
      const movedDown = moveDown(board);
      if (boardMoved(board, movedDown.board)) {
        const downWithRandom = placeRandom(movedDown.board);

        setBoard(downWithRandom);
        setScore(score + movedDown.score);
      }
    } else if (direction === "left") {
      const movedLeft = moveLeft(board);
      if (boardMoved(board, movedLeft.board)) {
        const leftWithRandom = placeRandom(movedLeft.board);

        setBoard(leftWithRandom);
        setScore(score + movedLeft.score);
      }
    }
  };

  const handleKeyDown = e => {
    let keycode = e.keyCode;
    const left = 49;
    const right = 50;
    const up = 51;
    const down = 52;

    if (keycode === up) {
      move("up");
    } else if (keycode === right) {
      move("right");
    } else if (keycode === down) {
      move("down");
    } else if (keycode === left) {
      move("left");
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.addEventListener("keydown", handleKeyDown);
    return () => {
      body.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="App">
      <div className="score">Score: {score}</div>

      <table>
        {board.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </table>
    </div>
  );
};

export default App;
