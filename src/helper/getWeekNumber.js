import getISOWeek from 'date-fns/get_iso_week';

export default function getWeekNumber(day) {
  return getISOWeek(day);
}
