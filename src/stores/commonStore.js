import { observable, action } from 'mobx';
import agent from '../agent';

class CommonStore {

  @observable appName = 'Conduit';
  @observable token = null;
  @observable viewChangeCounter = 0;
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;

  @action loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(action(({ tags}) => { this.tags = tags; }))
      .finally(action(() => { this.isLoadingTags = false; }))
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
