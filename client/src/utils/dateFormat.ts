export function convertDateFormat(date: string) {
  let curr_dt = new Date(date)
  let month: string = curr_dt.getMonth() + 1 < 10 ? (curr_dt.getMonth() + 1).toString() : "0" + ((curr_dt.getMonth() + 1)).toString();
  let form_dt = month + "/" + curr_dt.getDate() + "/" + curr_dt.getFullYear();
  return form_dt;
}
export function dateToString(date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateString = year + '/' + month + '/' + day;
  return dateString;
}
export function calculateMinDate(offset: number) {
  const min_date = new Date();
  min_date.setDate(min_date.getDate() - offset);
  return min_date.getTime()
}