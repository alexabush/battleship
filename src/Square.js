import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: ${({ border }) => border || '1px solid black'};
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color || 'white'};
`;

class Square extends Component {
  render() {
    let color;
    if (this.props.value < 10) color = 'lightblue';
    // if (this.props.value > 0) color = '#2C3539';
    if (this.props.value === 10) color = 'white';
    if (this.props.value === 100) color = 'red';
    // if (this.props.value === 2) color = 'yellow';
    return (
      <StyledDiv
        color={color}
        onClick={() => this.props.squareClicked(this.props.position)}
      >
        {/* <p>{this.props.position}</p> */}
        {/* <p>{this.props.value}</p> */}
      </StyledDiv>
    );
  }
}

export default Square;
