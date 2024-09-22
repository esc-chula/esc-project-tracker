import moment from 'moment-timezone';

export function formatDate (dateString: string | undefined)  {
    if (!dateString) return '--';
  
    const thaiTimeZone = 'Asia/Bangkok';
    const date = moment.tz(dateString, thaiTimeZone);
  
    const hoursDifference = moment().tz(thaiTimeZone).diff(date, 'hours');
    const minutesDifference = moment().tz(thaiTimeZone).diff(date, 'minutes');
  
    const formatThaiDate = (date: moment.Moment) => {
      const buddhistYear = date.year() + 543;
      const monthAbbreviation = date.format('MMM');
  
      const monthMap: { [key: string]: string } = {
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
  
      return `${date.date()} ${monthMap[monthAbbreviation]} ${buddhistYear.toString().slice(-2)}`;
    };
  
    if (hoursDifference < 1) {
      return `${minutesDifference} นาที`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} ชั่วโมง`;
    } else {
      return formatThaiDate(date);
    }
  };