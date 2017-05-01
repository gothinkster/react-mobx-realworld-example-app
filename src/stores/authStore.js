import { observable, action } from 'mobx';
import { hashHistory } from 'react-router';
import agent from '../agent';
import userStore from './userStore';

const updateToken = (token) => {
  window.localStorage.setItem('jwt', token);
  agent.setToken(token);
};

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    email: '',
    password: '',
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setEmail(email) {
    this.values.email = email;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ user }) => updateToken(user.token))
      .then(() => userStore.pullUser())
      .then(() => {hashHistory.replace('/')})
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.username, this.values.email, this.values.password)
      .then(({ user }) => updateToken(user.token))
      .then(() => userStore.pullUser())
      .then(() => hashHistory.replace('/'))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    updateToken(null);
    userStore.forgetUser();
    hashHistory.replace('/');
  }
}

export default new AuthStore();
