import React, { useState, useEffect } from "react";
import "./App.css";
import { Row } from "../../Components/Row/Row";

const App = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    initializeBoard(4);
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

  const initializeBoard = n => {
    let board = [];
    for (let i = 0; i < n; i++) {
      let innerArr = [];
      for (let j = 0; j < n; j++) {
        innerArr.push(0);
      }
      board.push(innerArr);
    }
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
          console.log(board[r][c]);

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
          console.log(board[r][c]);

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

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          console.log(board[r][c]);

          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    board = rotateLeft(board);

    return { board, score };
  };

  const moveLeft = inputBoard => {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          console.log(board[r][c]);

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
        if (checkForGameOver(upWithRandom)) {
          setBoard(upWithRandom);
          setGameOver(true);
        }
        // else if (checkForWin(board[r][c], 2048)) {

        //   setWinner(true);
        // }
        else {
          setBoard(upWithRandom);
          setScore(score + movedUp.score);
        }
      }
    } else if (direction === "right") {
      const movedRight = moveRight(board);
      if (boardMoved(board, movedRight.board)) {
        const rightWithRandom = placeRandom(movedRight.board);
        if (checkForGameOver(rightWithRandom)) {
          setBoard(rightWithRandom);
          setGameOver(true);
        } else {
          setBoard(rightWithRandom);
          setScore(score + movedRight.score);
        }
      }
    } else if (direction === "down") {
      const movedDown = moveDown(board);
      if (boardMoved(board, movedDown.board)) {
        const downWithRandom = placeRandom(movedDown.board);
        if (checkForGameOver(downWithRandom)) {
          setBoard(downWithRandom);
          setGameOver(true);
        } else {
          setBoard(downWithRandom);
          setScore(score + movedDown.score);
        }
      }
    } else if (direction === "left") {
      const movedLeft = moveLeft(board);
      if (boardMoved(board, movedLeft.board)) {
        const leftWithRandom = placeRandom(movedLeft.board);
        if (checkForGameOver(leftWithRandom)) {
          setBoard(leftWithRandom);
          setGameOver(true);
        } else {
          setBoard(leftWithRandom);
          setScore(score + movedLeft.score);
        }
      }
    }
  };

  console.log(winner);
  const checkForGameOver = board => {
    let moves = [
      boardMoved(board, moveUp(board).board),
      boardMoved(board, moveRight(board).board),
      boardMoved(board, moveDown(board).board),
      boardMoved(board, moveLeft(board).board)
    ];

    return moves.includes(true) ? false : true;
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
  const checkForWin = (board, value = "2048") => {
    return JSON.stringify(board).includes(value);
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (checkForWin(board)) {
      setWinner(true);
    } else {
      body.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      body.removeEventListener("keydown", handleKeyDown);
    };
  }, [setWinner, board, handleKeyDown]);

  return (
    <div className="App">
      <div className="header">
        <h2 className="title">2048</h2>
        <div className="score-container">
          <h2 className="score">Score</h2>
          <h2>{score}</h2>
        </div>
      </div>
      <div className="new-game">
        <p>Join the numbers and get to the 2048 tile!</p>
        <button onClick={() => initializeBoard(4)}>New Game</button>
      </div>
      <div className="instructions-container">
        <p className="instructions">
          Use 1 2 3 4 keys as left right up down respectively
        </p>
        <p className="instructions">Combine same numbers to double it...</p>
        <p className="instructions">
          Reach <span>2048</span>!!!
        </p>
      </div>
      <div className="table-container">
        <table className={gameOver || winner ? "onGameover" : null}>
          {board.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </table>
      </div>
      {gameOver ? <h2 className="game-over">Game Over</h2> : null}
      {winner ? <h2 className="winner">You win</h2> : null}
    </div>
  );
};

export default App;
