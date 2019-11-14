import React from 'react';

const DeleteButton = props => {
  const handleClick = () => props.onDelete(props.commentId);

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={handleClick} />
      </span>
    );
  }
  return null;
};

export default DeleteButton;
