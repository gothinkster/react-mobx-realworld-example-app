import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('commonStore')
@withRouter
@observer
export default class Home extends React.Component {
  componentWillMount() {
    this.props.commonStore.loadTags();
  }

  handleTagClick = tag => {
    const { location } = this.props;
    if (location.query.tab !== 'tag' || location.query.tag !== tag) {
      this.props.router.push({ location, query: { tab: 'tag', tag } });
    }
  };

  render() {
    const { tags, token, appName } = this.props.commonStore;
    return (
      <div className="home-page">

        <Banner token={token} appName={appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={tags}
                  onClickTag={this.handleTagClick}
                />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
