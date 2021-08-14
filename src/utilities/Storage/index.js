import { dcrypt, encrypt } from "../Encryption/encrypt";

class Storage {
  set(key, value) {
    window[key] = encrypt({
      data: value,
    });
    localStorage.setItem(
      key,
      encrypt({
        data: value,
      })
    );
  }
  get(key) {
    return this.isExist(key) ? dcrypt(localStorage.getItem(key)).data : null;
  }
  destroy(key) {
    localStorage.removeItem(key);
  }
  isExist(key) {
    return localStorage.getItem(key);
  }
}

const storage = new Storage();

export default storage;
