export const getReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.split(' ').length
  const minutes = words / wordsPerMinute

  return Math.ceil(minutes)
}
