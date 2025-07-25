import moment from "moment";

export function dateFormate(dateTime: string) {
  const formattedDate = moment(dateTime).format("YYYY-MM-DD");
  return formattedDate;
}
