const parseDate = (timestamp?: string, defaultOptions?: Intl.DateTimeFormatOptions) => {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp);
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * day;
  const dateDiff = now.getTime() - date.getTime();
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

  if (!date) {
    return '';
  }

  if (dateDiff < day) {
    const time = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  }
  if (dateDiff > day && dateDiff < week) {
    const weekday = date.toLocaleDateString('ru-RU', {
      weekday: 'short',
    });
    return weekday;
  }
  if (dateDiff > week && dateDiff < week) {
    const weekday = date.toLocaleDateString('ru-RU', {
      weekday: 'short',
    });
    return weekday;
  }
  if (date < firstDayOfYear) {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  return date.toLocaleDateString('ru-RU', defaultOptions);
};

export default parseDate;
