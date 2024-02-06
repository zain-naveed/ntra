const storeData = async (key:any, data:any) =>
  localStorage.setItem(key, JSON.stringify(data));
const getData = (key:string, callback:(arg:any)=>any) => {
  let data : any  =  localStorage.getItem(key);
  let resp = JSON.parse(data)
  if (resp) {
    callback(resp);
  } else {
    callback(false);
  }
};

const removeItem = (item:string) => localStorage.removeItem(item);

const removeItemsFromLocalStorage = async (keys:any) => {
  try {
    localStorage.removeItem(keys);
    return true;
  } catch (exception) {
    return false;
  }
}
export {
    storeData,
    getData,
    removeItem,
    removeItemsFromLocalStorage
}