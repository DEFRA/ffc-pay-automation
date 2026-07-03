import dayjs from 'dayjs'

export const getTodayDateParts = () => ({
  day: dayjs().format('DD'),
  month: dayjs().format('MM'),
  year: dayjs().format('YYYY')
})

export const getTodayFormatted = () =>
  dayjs().format('DD/MM/YYYY')

export const resolveDate = (value) =>
  value === 'today'
    ? getTodayFormatted()
    : value