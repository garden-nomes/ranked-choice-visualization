import React from 'react';
import './style.css';

export default ({ number, onClick, label }) => {
  const className = `VoteButton${number ? ` VoteButton_${number}` : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {number || <span>&nbsp;</span>}
    </button>
  );
};
