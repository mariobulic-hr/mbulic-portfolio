export const formatDateToMonthYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export const getPlaceholderImage = (width: number, height: number): string => {
  return `https://placehold.co/${width}x${height}`
}
