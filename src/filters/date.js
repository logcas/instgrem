function f(t) {
  return t < 10 ? '0' + t : t;
}

export function formatDate(time) {
  const t = new Date(time);
  const year = t.getFullYear();
  const month = t.getMonth() + 1;
  const day = t.getDate();
  const hour = t.getHours();
  const min = t.getMinutes();
  const sec = t.getSeconds();
  return `${year}-${f(month)}-${f(day)} ${f(hour)}:${f(min)}:${f(sec)}`;
}