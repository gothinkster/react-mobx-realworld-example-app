import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag);
            };

            return (
              <a
                href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <LoadingSpinner />
    );
  }
};

export default Tags;
