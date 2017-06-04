import ArticleList from '../ArticleList';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router'

const YourFeedTab = props => {
  if (props.currentUser) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed');
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all');
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound" /> {props.tag}
      </a>
    </li>
  );
};

@inject('articlesStore', 'commonStore', 'userStore')
@withRouter
@observer
export default class MainView extends React.Component {

  componentWillMount() {
    this.props.articlesStore.setPredicate(this.getPredicate());
    this.props.articlesStore.loadArticles();
  }

  componentDidUpdate(previousProps) {
    if (this.getTab(this.props) !== this.getTab(previousProps)) {
      this.props.articlesStore.setPredicate(this.getPredicate());
      this.props.articlesStore.loadArticles();
    }
  }

  getTab(props = this.props) {
    return props.location.query.tab || 'all';
  }

  getPredicate(props = this.props) {
    switch (this.getTab(props)) {
      case 'feed': return { myFeed: true };
      case 'tag': return { tag: props.location.query.tag };
      default: return {};
    }
  }

  handleTabChange = (tab) => {
    if (this.props.location.query.tab === tab) return;
    this.props.router.push({ ...this.props.location, query: { tab } })
  };

  handleSetPage = page => {
    this.props.articlesStore.setPage(page);
    this.props.articlesStore.loadArticles();
  };

  render() {
    const { currentUser } = this.props.userStore;
    const { articles, isLoading, page, totalPagesCount } = this.props.articlesStore;

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">

            <YourFeedTab
              currentUser={currentUser}
              tab={this.getTab()}
              onTabClick={this.handleTabChange}
            />

            <GlobalFeedTab
              tab={this.getTab()}
              onTabClick={this.handleTabChange}
            />

            <TagFilterTab tag={this.props.location.query.tag} />

          </ul>
        </div>

        <ArticleList
          articles={articles}
          loading={isLoading}
          totalPagesCount={totalPagesCount}
          currentPage={page}
          onSetPage={this.handleSetPage}
        />
      </div>
    );
  }
};
