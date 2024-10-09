import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment-timezone';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkFileType(file: File | undefined) {
  if (!file) return false;

  if (file.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'docx' || fileType === 'pdf' || fileType === 'doc')
      return true;
  }

  return false;
}

export function getFileType(file: File | undefined): string | undefined {
  if (!file?.name) return undefined;

  return file.name.split('.').pop();
}

export function convertDate(dateString: string) {
  const date = new Date(dateString);
  return new Date(date.getTime() + 7 * 60 * 60 * 1000).toLocaleString('th-TH', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

export function isUUID(uuid: string) {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(uuid);
}

export function formatDateMoment(dateString: string | undefined) {
  if (!dateString) return '--';

  const thaiTimeZone = 'Asia/Bangkok';
  const date = moment.tz(dateString, thaiTimeZone);

  const hoursDifference = moment().tz(thaiTimeZone).diff(date, 'hours');
  const minutesDifference = moment().tz(thaiTimeZone).diff(date, 'minutes');

  const formatThaiDate = (inputDate: moment.Moment) => {
    const buddhistYear = inputDate.year() + 543;
    const monthAbbreviation = inputDate.format('MMM');

    const monthMap: Record<string, string> = {
      Jan: 'ม.ค.',
      Feb: 'ก.พ.',
      Mar: 'มี.ค.',
      Apr: 'เม.ย.',
      May: 'พ.ค.',
      Jun: 'มิ.ย.',
      Jul: 'ก.ค.',
      Aug: 'ส.ค.',
      Sep: 'ก.ย.',
      Oct: 'ต.ค.',
      Nov: 'พ.ย.',
      Dec: 'ธ.ค.',
    };

    return `${inputDate.date()} ${monthMap[monthAbbreviation]} ${buddhistYear.toString().slice(-2)}`;
  };

  if (hoursDifference < 1) {
    return `${minutesDifference} นาที`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ชั่วโมง`;
  }
  return formatThaiDate(date);
}
