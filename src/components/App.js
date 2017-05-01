import agent from '../agent';
import Header from './Header';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'commonStore')
@observer
export default class App extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    } else {
      this.props.commonStore.commonStore.setAppLoaded();
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          {this.props.children}
        </div>
      );
    }
    return (
      <Header />
    );
  }
}
