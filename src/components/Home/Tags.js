import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {

            return (
              <Link
                to={{
                  pathname: "/",
                  search: "?tab=tag&tag=" + tag
                }}
                className="tag-default tag-pill"
                key={tag}
              >
                {tag}
              </Link>
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
