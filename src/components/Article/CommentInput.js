import React from 'react';
import { inject } from 'mobx-react';

@inject('commentsStore')
export default class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.handleBodyChange = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      this.props.commentsStore.createComment({ body: this.state.body })
        .then(() => this.setState({ body: '' }));
    };
  }

  render() {
    const { isCreatingComment } = this.props.commentsStore;
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            disabled={isCreatingComment}
            onChange={this.handleBodyChange}
            rows="3"
          />
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
            alt=""
          />
          <button
            className="btn btn-sm btn-primary"
            type="submit"
          >
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}
