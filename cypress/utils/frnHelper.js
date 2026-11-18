export const generateFRN = () => {
  return (1000000000 + (Date.now() % 9000000000)).toString()
}