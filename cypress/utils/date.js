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

export const getFutureDateParts = (days = 1) => ({
  day: dayjs().add(days, 'day').format('DD'),
  month: dayjs().add(days, 'day').format('MM'),
  year: dayjs().add(days, 'day').format('YYYY')
})

export const getFormattedFutureDate = (days = 1) =>
  dayjs().add(days, 'day').format('DD/MM/YYYY')

export const getDatePriorTo = (date) => ({
  day: dayjs(date, 'DD/MM/YYYY').subtract(1, 'day').format('DD'),
  month: dayjs(date, 'DD/MM/YYYY').subtract(1, 'day').format('MM'),
  year: dayjs(date, 'DD/MM/YYYY').subtract(1, 'day').format('YYYY')
})