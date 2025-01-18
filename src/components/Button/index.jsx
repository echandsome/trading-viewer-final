import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const shouldForwardProp = (prop) =>
  !['bgColor', 'color', 'borderRadius', 'padding', 'fontSize', 'hoverBgColor', 'disabledBgColor', 'size'].includes(prop);

const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})`
  background-color: ${(props) => props.bgColor || 'blue'};
  color: ${(props) => `${props.color}px` || 'white'};
  border: none;
  border-radius: ${(props) => props.borderRadius || '0px'};
  padding: ${(props) => props.padding || '0px'};
  font-size: ${(props) => `${props.fontSize}px` || '16px'};
  cursor: pointer;
  transition: background-color 0.3s;
  width: ${(props) => `${props.size}px` || 'auto'};
  height: ${(props) => `${props.size}px` || 'auto'};

  &:hover {
    background-color: ${(props) => `${props.hoverBgColor}` || 'darkblue'};
  }

  &:disabled {
    background-color: ${(props) => `${props.disabledBgColor}px` || 'gray'};
    cursor: not-allowed;
  }
`;

const Button = ({ children, bgColor, color, borderRadius, padding, fontSize, hoverBgColor, disabledBgColor, size, ...props }) => {
  if (typeof bgColor !== 'string') {
    console.error('Invalid prop `bgColor` supplied to `Button`. Expected a string.');
  }

  return (
    <StyledButton
      bgColor={bgColor}
      color={color}
      borderRadius={borderRadius}
      padding={padding}
      fontSize={fontSize}
      hoverBgColor={hoverBgColor}
      disabledBgColor={disabledBgColor}
      size={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  hoverBgColor: PropTypes.string,
  disabledBgColor: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
