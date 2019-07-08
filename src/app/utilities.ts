export function generateID(list: any[]): number {
  let i = 0;
  let id: number;
  while (i >= 0) {
    id = Math.floor(Math.random() * 99999999999);
    i = list.findIndex(item => item.id === id);
  }
  return id;
}

export function percent(cur1: number, cur2: number, total1?: number): number {
  return (cur2 * (total1 || 100)) / cur1;
}