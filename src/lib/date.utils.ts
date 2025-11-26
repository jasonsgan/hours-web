export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - ((day + 6) % 7); // Monday as 0
  d.setDate(diff);
  d.setHours(0,0,0,0);
  return d;
}

export function getSunday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() + (7 - day) % 7;
  d.setDate(diff);
  d.setHours(0,0,0,0);
  return d;
}