import React, { Component } from 'react';
import Board from './Board';
import './App.css';

const SHIPS = [
  { Carrier: 5 },
  { Battleship: 4 },
  { Destroyer: 3 },
  { Submarine: 3 },
  { 'Patrol Boat': 2 }
];

const DEFAULT_STATE = {
  winStatus: 0,
  p1Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  }),
  p2Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  })
  // lastMove: null
};

function randomNum(start, end) {
  const num = Math.floor(Math.random() * end) + start;
  return num;
}

class App extends Component {
  constructor(props) {
    super(props);
    //deep clone
    this.state = {
      ...JSON.parse(JSON.stringify(DEFAULT_STATE)),
      isPlayer1Start: true,
      isPlayer1Turn: true
    };
  }

  componentDidMount() {
    this.setState(prevState => {
      const board = { ...prevState }.p1Board;
      board.forEach((row, rowIndex) => {
        row.forEach((square, columnIndex) => {
          if (rowIndex === 1 && columnIndex < 5) {
            board[rowIndex][columnIndex] = 5;
          }
          if (rowIndex === 3 && columnIndex < 4) {
            board[rowIndex][columnIndex] = 4;
          }
          if (rowIndex === 5 && columnIndex < 3) {
            board[rowIndex][columnIndex] = 3;
          }
          if (rowIndex === 7 && columnIndex < 3) {
            board[rowIndex][columnIndex] = 3.5;
          }
          if (rowIndex === 9 && columnIndex < 2) {
            board[rowIndex][columnIndex] = 2;
          }
        });
      });
      return { p1Board: board };
    });

    this.setState(prevState => {
      const board = { ...prevState }.p2Board;
      board.forEach((row, rowIndex) => {
        row.forEach((square, columnIndex) => {
          if (columnIndex === 1 && rowIndex < 5) {
            board[rowIndex][columnIndex] = 5;
          }
          if (columnIndex === 3 && rowIndex < 4) {
            board[rowIndex][columnIndex] = 4;
          }
          if (columnIndex === 5 && rowIndex < 3) {
            board[rowIndex][columnIndex] = 3;
          }
          if (columnIndex === 7 && rowIndex < 3) {
            board[rowIndex][columnIndex] = 3.5;
          }
          if (columnIndex === 9 && rowIndex < 2) {
            board[rowIndex][columnIndex] = 2;
          }
        });
      });
      return { p2Board: board };
    });
  }

  squareClicked = (isPlayer1Turn, boardId, position) => {
    console.log('in square clicked');
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      if ((boardId === 1 && isPlayer1Turn) || (boardId === 2 && !isPlayer1Turn))
        return prevState;
      const newState = { ...prevState };
      const currentBoard = isPlayer1Turn ? newState.p2Board : newState.p1Board;
      if (currentBoard[targetRow][targetColumn] === 0) {
        // newState.lastMove = position;
        // if (isHit(board, position)) currentBoard[targetRow][targetColumn] = 100;
        // else
        currentBoard[targetRow][targetColumn] = 10;
        newState.isPlayer1Turn = !newState.isPlayer1Turn;
      }
      return newState;
    });
    // this.checkWin();
  };

  // checkWin = () => {
  //   this.setState(prevState => {
  //     if (prevState.winStatus !== 0) return prevState;
  //     const newState = { ...prevState };
  //     const currentBoard = newState.board;
  //     let p1Wins,
  //       p2Wins = false;
  //     const columns = Array.from({ length: currentBoard.length }, val => []);
  //     const diagonals = Array.from({ length: 24 }, val => []);

  //     currentBoard.forEach((row, rowIndex) => {
  //       if (isConnectFour(row, 1)) p1Wins = true;
  //       if (isConnectFour(row, 2)) p2Wins = true;

  //       columns.forEach(column => {
  //         if (isConnectFour(column, 1)) p1Wins = true;
  //         if (isConnectFour(column, 2)) p2Wins = true;
  //       });
  //       if (p1Wins) newState.winStatus = 1;
  //       if (p2Wins) newState.winStatus = 2;
  //       return newState;
  //     });
  //   });
  // };

  // playAgain = () =>
  //   this.setState(prevState => {
  //     const newState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  //     newState.isPlayer1Start = !prevState.isPlayer1Start;
  //     newState.isPlayer1Turn = newState.isPlayer1Start;
  //     return newState;
  //   });

  render() {
    let playStatus;
    switch (this.state.winStatus) {
      case 0:
        playStatus = 'Keep Playing!';
        break;
      case 1:
        playStatus = 'Player 1 Wins!';
        break;
      case 2:
        playStatus = 'Player 2 Wins!';
        break;
      case 3:
        playStatus = 'Stalemate!';
        break;
    }
    return (
      <div className="App text-center">
        <h1>Battleship</h1>
        <Board
          board={this.state.p1Board}
          boardId={1}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          // winStatus={this.state.winStatus}
          // playAgain={this.playAgain}
          // lastMove={this.state.lastMove}
        />
        <p>Space</p>
        <Board
          board={this.state.p2Board}
          boardId={2}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          // winStatus={this.state.winStatus}
          // playAgain={this.playAgain}
          // lastMove={this.state.lastMove}
        />
        <p>Ready: {this.state.isPlayer1Turn ? 'Player 1' : 'Player 2'}</p>
        <p>{playStatus}</p>
        <button className="btn btn-primary" onClick={this.playAgain}>
          Play Again?
        </button>
      </div>
    );
  }
}

export default App;

//this needs to be tested more rigorously
// export const isConnectFour = (arr, player) => {
//   let maxCount = 0;
//   let counter = 0;
//   let current;
//   //need to see if there is four in a row of the player's number
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === player) {
//       current = player;
//       counter++;
//     } else {
//       current = arr[i];
//       if (maxCount < counter) maxCount = counter;
//       counter = 0;
//     }
//   }
//   if (maxCount < counter) maxCount = counter;
//   return maxCount >= 4;
// };

// ''`
// add ships to board randomly
// make sure there is no overlap

// need to make a randomizer of some sort
// ```;
