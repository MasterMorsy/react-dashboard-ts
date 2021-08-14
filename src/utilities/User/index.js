import storage from "../Storage";

export class User {
  constructor() {
    this.userData = {};
    this.listeners = {};
    this.alias = "customer";
  }

  onChange(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  }

  onChanges(callback) {
    for (let key in this.userData) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(callback);
    }
  }

  isBeingWatched(key) {
    return this.listeners[key] !== undefined;
  }

  /**
   * initalize user data and name
   * set data with new name if exist an get data
   * from storage with same name
   * @param {string} name
   */
  init(name) {
    this.alias = name ? name : this.alias;
    this.watch();
  }
  /**
   * get userData
   * @returns {object}
   */
  info() {
    return this.userData;
  }
  /**
   * get single property in userData
   * @param {string} key
   * @returns {any}
   */
  get(key) {
    return this.userData[key];
  }
  /**
   * get roles property in userData
   * @returns {any}
   */
  role() {
    return this.userData['role'];
  }
  /**
   * get roles premessions property in userData
   * @returns {any}
   */
  isCan(moduleName, premession) {
    return this.userData['role']["permissions"]?.find( module => module.name === moduleName)?.["roles"][premession];
  }

  /**
   * set single property in userData
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    if (this.isBeingWatched(key)) {
      this.triggerChange(key, value, this.get(key));
    }
    this.userData[key] = value;
    storage.set(this.alias, this.userData);
  }

  triggerChange(key, newValue, oldValue) {
    for (let callback of this.listeners[key]) {
      callback(newValue, oldValue);
    }
  }

  /**
   * update userData
   * @param {object} userData
   */
  update(userData) {
    this.userData = userData;
    storage.set(this.alias, this.userData);

    for (let key in userData) {
      if (this.isBeingWatched(key)) {
        this.triggerChange(key, userData[key], this.get(key));
      }
    }
  }

  /**
   * check user in storage
   * @returns {object}
   */
  isLogged() {
    return storage.isExist(this.alias);
  }

  /**
   * remove user from storage
   */
  logout() {
    storage.destroy(this.alias);
  }

  /**
   * update user from storage
   */
  watch() {
    if (this.isLogged()) {
      this.update(storage.get(this.alias));
    }
  }

  /**
   * trigger changes
   */
  trigger() {
    if (storage.get(this.alias) != this.info()) return true;
  }
}

const user = new User();

export default user;
