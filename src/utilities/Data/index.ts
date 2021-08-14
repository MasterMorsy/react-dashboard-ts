interface Window {
  storeData: any;
}

function info() {
  return (<any>window).storeData.data;
}

function update(data: any) {
  (<any>window).storeData.data = data;
  return (<any>window).storeData.data;
}

function set(key: string, value: any) {
  (<any>window).storeData.data[key] = value;
  return (<any>window).storeData.data;
}

function get(key: string) {
  return (<any>window).storeData.data[key];
}

function init(alias = "storeData") {
  (<any>window)[alias] = {
    alias,
    data: {},
  };
}

const globalStore = {
  init,
  get,
  set,
  update,
  info,
};

export default globalStore;
