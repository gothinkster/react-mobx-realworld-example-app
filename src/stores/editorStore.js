import { observable, action } from 'mobx';
import articlesStore from './articlesStore';

class EditorStore {

  @observable inProgress = false;
  @observable errors = undefined;
  @observable articleSlug = undefined;

  @observable title = '';
  @observable description = '';
  @observable body = '';
  @observable tagList = [];

  @action setArticleSlug(articleSlug) {
    if (this.articleSlug !== articleSlug) {
      this.reset();
      this.articleSlug = articleSlug;
    }
  }

  @action loadInitialData() {
    if (!this.articleSlug) return Promise.resolve();
    this.inProgress = true;
    return articlesStore.loadArticle(this.articleSlug, { acceptCached: true })
      .then(action((article) => {
        if (!article) throw new Error('Can\'t load original article');
        this.title = article.title;
        this.description = article.description;
        this.body = article.body;
        this.tagList = article.tagList;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action reset() {
    this.title = '';
    this.description = '';
    this.body = '';
    this.tagList = [];
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setDescription(description) {
    this.description = description;
  }

  @action setBody(body) {
    this.body = body;
  }

  @action addTag(tag) {
    if (this.tagList.includes(tag)) return;
    this.tagList.push(tag);
  }

  @action removeTag(tag) {
    this.tagList = this.tagList.filter(t => t !== tag);
  }

  @action submit() {
    this.inProgress = true;
    this.errors = undefined;
    const article = {
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList,
      slug: this.articleSlug,
    };
    return (this.articleSlug ? articlesStore.updateArticle(article) : articlesStore.createArticle(article))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors; throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
}

export default new EditorStore();
