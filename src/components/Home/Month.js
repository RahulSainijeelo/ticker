import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
} from "date-fns";
function generateMonthCalendar(year, month) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  const calendar = [];
  let week = [];

  // Adjust the start and end of the interval to start on Monday
  const adjustedStart = startOfWeek(start, { weekStartsOn: 1 });
  const adjustedEnd = endOfWeek(end, { weekStartsOn: 1 });
  const fullInterval = eachDayOfInterval({ start: adjustedStart, end: adjustedEnd });

  fullInterval.forEach(day => {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  });

  return calendar.map(week => week.map(day => format(day, 'd')));
}

export default generateMonthCalendar;
