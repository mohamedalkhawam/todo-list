export function deleteTask(
  key: string,
  id: string,
  deleteAll: boolean = false
) {
  let data: any = localStorage.getItem(key);
  if (data) {
    if (deleteAll) {
      localStorage.removeItem(key);
    } else {
      data = JSON.parse(data);
      if (Array.isArray(data)) {
        data = data.filter((item: any) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(data));
      }
    }
  }
}
