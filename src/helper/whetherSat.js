import isSaturday from 'date-fns/is_saturday';


export default function whetherSat(day) {
  return isSaturday(day);
}
