import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react';

const ArticleMeta = observer(props => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt="" />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} onDelete={props.onDelete} />
    </div>
  );
});

export default ArticleMeta;
