import isSameDay from 'date-fns/is_same_day';
import isBetween from './isBetween';

export default function whetherSelected(day, selectedDate, from, to) {
  if (isSameDay(day, from)
    || isBetween(day, from, to)
    || isSameDay(day, to)
  ) return true;
  return false;
}
