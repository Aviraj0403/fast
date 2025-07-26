import dayjs from 'dayjs';

export function dateFormate(dateTime: string) {
  const formattedDate = dayjs(dateTime).format("YYYY-MM-DD");
  return formattedDate;
}
