export function addToStorage(key: string, newTask: any) {
  let data: any = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data); // data is array
    if (Array.isArray(data)) {
      data.push(newTask); // add the new task
      localStorage.setItem(key, JSON.stringify(data)); // make the array string and add to localStorage
    } else {
      localStorage.setItem(key, JSON.stringify([data, newTask]));
    }
  } else {
    localStorage.setItem(key, JSON.stringify([newTask]));
  }
}
