// export function formatDate(dateString: string): string {
//   const [datePart, timePart] = dateString.split(" ");
//   const [year, month, day] = datePart.split("-");
//   return `${year}. ${parseInt(month, 10)}. ${parseInt(
//     day,
//     10
//   )}. ${timePart.slice(0, 5)}`;
// }

export function formatDate(isoString: string) {
  const date = new Date(isoString); // 문자열을 Date 객체로 변환

  const year = date.getFullYear(); // 연도 가져오기
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 가져오기 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, "0"); // 일 가져오기
  const hours = String(date.getHours()).padStart(2, "0"); // 시 가져오기
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 가져오기

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
}
