import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import isSameMonth from 'date-fns/is_same_month';


export default function whetherDisabled(day, month, minDate, maxDate) {
  if (month && !isSameMonth(day, month)) {
    return true;
  }
  if (minDate && isBefore(day, minDate)) {
    return true;
  }
  if (maxDate && isAfter(day, maxDate)) {
    return true;
  }
  return false;
}
