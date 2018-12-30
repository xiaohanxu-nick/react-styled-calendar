import format from 'date-fns/format';
import getUserLocale from 'get-user-locale';
import zh from 'date-fns/locale/zh_cn';
import en from 'date-fns/locale/en';

const locales = {
  zh,
  en,
};
export default function (date, formatStr) {
  const locale = getUserLocale();
  return format(date, formatStr, { locale: locales[locale] });
}
