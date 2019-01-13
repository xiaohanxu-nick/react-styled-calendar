import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

export default function isBetween(date, from, to) {
  return isBefore(date, to) && isAfter(date, from);
}
