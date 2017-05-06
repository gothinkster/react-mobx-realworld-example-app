import Header from './Header';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'commonStore')
@observer
export default class App extends React.Component {

  componentWillMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    } else {
      this.props.commonStore.setAppLoaded();
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          {this.props.children}
        </div>
      );
    }
    return (
      <Header />
    );
  }
}
