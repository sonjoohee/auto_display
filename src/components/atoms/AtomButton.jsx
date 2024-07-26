import React from 'react';

const AtomButton = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

export default AtomButton;
