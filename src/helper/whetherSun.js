import isSunday from 'date-fns/is_sunday';

export default function whetherSun(day) {
  return isSunday(day);
}
