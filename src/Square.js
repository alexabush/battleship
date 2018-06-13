import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color || 'white'};
`;

class Square extends Component {
  render() {
    let color;
    if (this.props.value < 10) color = 'lightblue';
    if (this.props.value === 10) color = 'white';
    if (this.props.value === 100) color = 'red';
    return (
      <StyledDiv
        color={color}
        onClick={() => this.props.squareClicked(this.props.position)}
      />
    );
  }
}

export default Square;
