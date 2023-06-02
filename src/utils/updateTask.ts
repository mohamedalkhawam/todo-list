export function updateTask(key: string, newItem: any) {
  let data: any = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
    if (Array.isArray(data)) {
      data = data.map((item: any) => (item.id === newItem.id ? newItem : item));
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
}
