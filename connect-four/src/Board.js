import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

const Row = styled.div`
  /* flex-direction: row; */
`;

class Board extends Component {
  render() {
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((square, column) => (
          <Square
            key={column}
            position={[rowIndex, column]}
            value={square}
            squareClicked={this.props.squareClicked}
          />
        ))}
      </Row>
    ));
    return (
      <div>
        <div>{squares}</div>
        <p>Ready: {this.props.currentTurn ? 'Player 1' : 'Player 2'}</p>
      </div>
    );
  }
}

export default Board;
