import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

const Row = styled.div`
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Board extends Component {
  render() {
    let squareClicked = this.props.squareClicked.bind(
      null,
      this.props.currentTurn,
      this.props.boardId
    );
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((square, column) => {
          const position = [rowIndex, column];
          return (
            <Square
              key={column}
              position={position}
              value={square}
              squareClicked={squareClicked}
            />
          );
        })}
      </Row>
    ));

    return <div>{squares}</div>;
  }
}

export default Board;
