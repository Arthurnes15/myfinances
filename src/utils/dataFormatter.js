export function dateFormatter(dateSpending) {
  const date = new Date(dateSpending);
  return date.toLocaleDateString();
}
