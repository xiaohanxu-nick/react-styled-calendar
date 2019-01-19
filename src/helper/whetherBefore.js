import isBefore from 'date-fns/is_before';

export default function whetherBefore(day, selectedDate) {
  return isBefore(day, selectedDate);
}
