export const generateFRN = () => {
  return (1000000000 + (Date.now() % 9000000000)).toString()
}

export const generateFRNNotMappedToDate = () => {
  return Math.floor(Math.random() * (9999999999 - 100000000 + 1)) + 100000000
}