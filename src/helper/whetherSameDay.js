import isSameDay from 'date-fns/is_same_day';

export default function whetherSameDay(day, selectedDate) {
  return isSameDay(day, selectedDate);
}
