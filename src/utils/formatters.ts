/**
 * Format number as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Convert weeks to human-readable duration
 */
export function formatWeeksToDuration(weeks: number): string {
  if (weeks === 0) return 'Instantly'
  if (weeks === 1) return '1 week'
  if (weeks < 4) return `${weeks} weeks`

  const months = Math.floor(weeks / 4.33)
  const remainingWeeks = Math.round(weeks % 4.33)

  if (months === 1) {
    return remainingWeeks > 0
      ? `1 month, ${remainingWeeks} weeks`
      : '1 month'
  }

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 1) {
    return remainingMonths > 0
      ? `1 year, ${remainingMonths} months`
      : '1 year'
  }

  if (years > 1) {
    return remainingMonths > 0
      ? `${years} years, ${remainingMonths} months`
      : `${years} years`
  }

  return `${months} months`
}

/**
 * Calculate date from weeks
 */
export function calculateFutureDate(weeks: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + weeks * 7)
  return date
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
