export function getTasks(key: string) {
  let data: any = localStorage.getItem(key);
  if (data) data = JSON.parse(data);
  else data = [];
  return data;
}
