import { Link } from 'react-router-dom';
import React from 'react';

const ArticleActions = props => {
  const article = props.article;
  const handleDelete = () => props.onDelete(article.slug);

  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
          <i className="ion-trash-a" /> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span />
  );
};

export default ArticleActions;
