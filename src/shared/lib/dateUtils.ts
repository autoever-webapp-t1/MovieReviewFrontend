export function formatDate(dateString: string): string {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${year}. ${parseInt(month, 10)}. ${parseInt(
    day,
    10
  )}. ${timePart.slice(0, 5)}`;
}
