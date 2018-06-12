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
    let highlight;
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((square, column) => {
          const position = [rowIndex, column];
          // if (this.props.lastMove) {
          //   if (
          //     this.props.lastMove[0] === position[0] &&
          //     this.props.lastMove[1] === position[1]
          //   ) {
          //     highlight = true;
          //   } else {
          //     highlight = false;
          //   }
          // }
          return (
            <Square
              key={column}
              position={position}
              value={square}
              // squareClicked={this.props.squareClicked}
              // highlight={highlight}
            />
          );
        })}
      </Row>
    ));

    return <div>{squares}</div>;
  }
}

export default Board;
