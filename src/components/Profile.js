'use strict';

import ArticleList from './ArticleList';
import React from 'react';
import { Link, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.following) {
      props.unfollow(props.username)
    } else {
      props.follow(props.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.following ? 'Unfollow' : 'Follow'} {props.username}
    </button>
  );
};


@inject('articlesStore', 'profileStore', 'userStore')
@withRouter
@observer
export default class Profile extends React.Component {
  componentWillMount() {
    this.props.profileStore.loadProfile(this.props.params.username);
    this.props.profileStore.articlesStore.setPredicate(this.getPredicate());
    this.props.profileStore.articlesStore.loadArticles();
  }

  componentDidUpdate(previousProps) {
    if (this.props.location !== previousProps.location) {
      this.props.profileStore.loadProfile(this.props.params.username);
      this.props.profileStore.articlesStore.setPredicate(this.getPredicate());
      this.props.profileStore.articlesStore.loadArticles();
    }
  }

  getTab() {
    if (/\/favorites/.test(this.props.location.pathname)) return 'favorites';
    return 'all'
  }

  getPredicate() {
    switch (this.getTab()) {
      case 'favorites': return { favoritedBy: this.props.params.username }
      default: return { author: this.props.params.username }
    }
  }

  handleFollow = () => this.props.profileStore.follow();
  handleUnfollow = () => this.props.profileStore.unfollow();

  handleSetPage = page => {
    this.props.profileStore.articlesStore.setPage(page);
    this.props.profileStore.articlesStore.loadArticles();
  };

  renderTabs() {
    const { profile } = this.props.profileStore;
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            activeClassName="active"
            to={`@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            activeClassName="active"
            to={`@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { profile, isLoadingProfile, articlesStore } = this.props.profileStore;
    const { currentUser } = this.props.userStore;

    if (isLoadingProfile && !profile) return <div>Loading...</div>;
    if (!profile) return <div>?</div>;

    const isUser = currentUser && profile.username === currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  username={profile.username}
                  following={profile.following}
                  follow={this.handleFollow}
                  unfollow={this.handleUnfollow}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                articles={articlesStore.articles}
                totalPagesCount={articlesStore.totalPagesCount}
                onSetPage={this.handleSetPage}
              />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export { Profile as Profile };
