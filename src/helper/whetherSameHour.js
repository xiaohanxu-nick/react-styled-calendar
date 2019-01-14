import isSameHour from 'date-fns/is_same_hour';

export default function whetherSameHour(hour, selectedHour) {
  return isSameHour(hour, selectedHour);
}
