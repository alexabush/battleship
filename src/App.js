import React, { Component } from 'react';
import Board from './Board';
import './App.css';

const SHIPS = [
  { name: 'Carrier', num: 5, remainingHits: 5 },
  { name: 'Battleship', num: 4, remainingHits: 4 },
  { name: 'Destroyer', num: 3, remainingHits: 3 },
  { name: 'Submarine', num: 3.5, remainingHits: 3 },
  { name: 'Patrol Boat', num: 2, remainingHits: 2 }
];

const BOARD = Array.from({ length: 10 }, val => {
  return Array.from({ length: 10 }, val => 0);
});

//refactor so I get a deep copy but don't need to copy and paste
const DEFAULT_STATE = {
  winStatus: 0,
  p1Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  }),
  p2Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  }),
  p1Ships: [
    { name: 'Carrier', num: 5, remainingHits: 5 },
    { name: 'Battleship', num: 4, remainingHits: 4 },
    { name: 'Destroyer', num: 3, remainingHits: 3 },
    { name: 'Submarine', num: 3.5, remainingHits: 3 },
    { name: 'Patrol Boat', num: 2, remainingHits: 2 }
  ],
  p2Ships: [
    { name: 'Carrier', num: 5, remainingHits: 5 },
    { name: 'Battleship', num: 4, remainingHits: 4 },
    { name: 'Destroyer', num: 3, remainingHits: 3 },
    { name: 'Submarine', num: 3.5, remainingHits: 3 },
    { name: 'Patrol Boat', num: 2, remainingHits: 2 }
  ]
};

//includes start and end in range
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
    this.setShips();
    // this.setState(prevState => {
    //   const board = { ...prevState }.p1Board;
    //   board.forEach((row, rowIndex) => {
    //     row.forEach((square, columnIndex) => {
    //       if (rowIndex === 1 && columnIndex < 5) {
    //         board[rowIndex][columnIndex] = 5;
    //       }
    //       if (rowIndex === 3 && columnIndex < 4) {
    //         board[rowIndex][columnIndex] = 4;
    //       }
    //       if (rowIndex === 5 && columnIndex < 3) {
    //         board[rowIndex][columnIndex] = 3;
    //       }
    //       if (rowIndex === 7 && columnIndex < 3) {
    //         board[rowIndex][columnIndex] = 3.5;
    //       }
    //       if (rowIndex === 9 && columnIndex < 2) {
    //         board[rowIndex][columnIndex] = 2;
    //       }
    //     });
    //   });
    //   return { p1Board: board };
    // });
    // this.setState(prevState => {
    //   const board = { ...prevState }.p2Board;
    //   board.forEach((row, rowIndex) => {
    //     row.forEach((square, columnIndex) => {
    //       if (columnIndex === 1 && rowIndex < 5) {
    //         board[rowIndex][columnIndex] = 5;
    //       }
    //       if (columnIndex === 3 && rowIndex < 4) {
    //         board[rowIndex][columnIndex] = 4;
    //       }
    //       if (columnIndex === 5 && rowIndex < 3) {
    //         board[rowIndex][columnIndex] = 3;
    //       }
    //       if (columnIndex === 7 && rowIndex < 3) {
    //         board[rowIndex][columnIndex] = 3.5;
    //       }
    //       if (columnIndex === 9 && rowIndex < 2) {
    //         board[rowIndex][columnIndex] = 2;
    //       }
    //     });
    //   });
    //   return { p2Board: board };
    // });
  }

  setShips = () => {
    //we're assuming state has been set to DEFAULT_STATE
    console.log('in setShips');
    this.setState(prevState => {
      // const newState = { ...prevState };
      const newp1Board = [...prevState.p1Board];
      const newp2Board = [...prevState.p2Board];
      this.state.p1Ships.forEach(ship => {
        let continueLoop = true;
        console.log('ship name,', ship.name);
        while (continueLoop) {
          console.log('in setShip while loop');
          const randomRow = randomNum(0, 8);
          const randomColumn = randomNum(0, 8);
          const isHorizontal = randomNum(0, 1) > 0;
          const shipLength = ship.remainingHits;
          if (isHorizontal) {
            if (randomColumn + shipLength >= 10) {
              //change [randomRow, randomColumn] through randomColumn + shipLength to ship.num
              let isPathClear = true;
              for (let i = randomColumn; i < randomColumn + shipLength; i++) {
                if (newp1Board[randomRow][i] !== 0) isPathClear = false;
              }
              if (isPathClear) {
                for (let i = randomColumn; i < randomColumn + shipLength; i++) {
                  newp1Board[randomRow][i] = ship.num;
                }
                console.log('exiting while loop');
                continueLoop = false;
              }
              console.log('repeating while loop');
            }
          } else {
            if (randomRow + shipLength < 10) {
              //change [randomRow, randomColumn] through randomRow + shipLength to ship.num
              let isPathClear = true;
              for (let i = randomRow; i < randomRow + shipLength; i++) {
                if (newp1Board[i][randomColumn] !== 0) isPathClear = false;
              }
              if (isPathClear) {
                for (let i = randomRow; i < randomRow + shipLength; i++) {
                  newp1Board[i][randomColumn] = ship.num;
                }
                console.log('exiting while loop');
                continueLoop = false;
              }
              console.log('continuing while loop');
            }
          }
        }
        debugger;
      });
      return { p1Board: newp1Board, p2Board: newp2Board };
    });
  };

  squareClicked = (isPlayer1Turn, boardId, position) => {
    console.log('in square clicked');
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      if ((boardId === 1 && isPlayer1Turn) || (boardId === 2 && !isPlayer1Turn))
        return prevState;
      const newState = { ...prevState };
      const currentBoard = isPlayer1Turn ? newState.p2Board : newState.p1Board;
      const currentShips = isPlayer1Turn
        ? [...newState.p2Ships]
        : [...newState.p1Ships];
      if (this.isHit(currentBoard, position)) {
        console.log('isHit');
        newState.ships = this.getUpdatedShips(
          currentBoard,
          position,
          currentShips
        );
        currentBoard[targetRow][targetColumn] = 100;
        newState.winStatus = this.checkWin(isPlayer1Turn, newState.ships);
      } else {
        currentBoard[targetRow][targetColumn] = 10;
      }
      newState.isPlayer1Turn = !newState.isPlayer1Turn;
      return newState;
    });
  };

  isHit = (board, position) => {
    console.log('in isHit');
    const square = board[position[0]][position[1]];
    if (square > 0 && square <= 5) {
      return true;
    } else return false;
  };

  getUpdatedShips = (board, position, ships) => {
    console.log('in processHit');
    const shipNum = board[position[0]][position[1]];
    const shipIndex = ships.findIndex(ship => ship.num === shipNum);
    ships[shipIndex].remainingHits -= 1;
    if (ships[shipIndex].remainingHits <= 0) {
      console.log('ship destroyed');
    }
    return ships;
  };

  checkWin = (isPlayer1Turn, ships) => {
    const isGameOver = ships.every(ship => ship.remainingHits === 0);
    if (isGameOver && isPlayer1Turn) return 1;
    if (isGameOver && !isPlayer1Turn) return 2;
    return 0;
  };

  playAgain = () =>
    this.setState(prevState => {
      const newState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      newState.isPlayer1Start = !prevState.isPlayer1Start;
      newState.isPlayer1Turn = newState.isPlayer1Start;
      return newState;
    });

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
    }
    return (
      <div className="App text-center">
        <h1>Battleship</h1>
        <Board
          board={this.state.p1Board}
          boardId={1}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          playAgain={this.playAgain}
        />
        <p>Space</p>
        <Board
          board={this.state.p2Board}
          boardId={2}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          playAgain={this.playAgain}
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
