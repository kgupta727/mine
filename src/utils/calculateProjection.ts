/**
 * ProjectionData interface
 */
export interface ProjectionData {
  week: number
  saved: number
}

/**
 * Projection result interface
 */
export interface ProjectionResult {
  weeksNeeded: number
  dataPoints: ProjectionData[]
  aggressiveWeeks: number
  aggressiveDataPoints: ProjectionData[]
  relaxedWeeks: number
  relaxedDataPoints: ProjectionData[]
}

/**
 * Calculate financial projection based on target amount and weekly savings
 * @param targetAmount - The goal amount in USD
 * @param weeklySavings - Amount to save per week in USD
 * @returns ProjectionResult with all scenarios
 */
export function calculateProjection(
  targetAmount: number,
  weeklySavings: number
): ProjectionResult {
  // Validate inputs
  if (targetAmount <= 0 || weeklySavings <= 0) {
    return {
      weeksNeeded: 0,
      dataPoints: [],
      aggressiveWeeks: 0,
      aggressiveDataPoints: [],
      relaxedWeeks: 0,
      relaxedDataPoints: [],
    }
  }

  // Calculate base projection
  const weeksNeeded = Math.ceil(targetAmount / weeklySavings)
  const cappedWeeks = Math.min(weeksNeeded, 520) // Cap at 10 years

  // Generate data points for main scenario
  const dataPoints: ProjectionData[] = []
  for (let week = 1; week <= cappedWeeks; week++) {
    dataPoints.push({
      week,
      saved: Math.min(week * weeklySavings, targetAmount),
    })
  }

  // Calculate aggressive scenario (+20%)
  const aggressiveWeeklySavings = weeklySavings * 1.2
  const aggressiveWeeks = Math.ceil(targetAmount / aggressiveWeeklySavings)
  const cappedAggressiveWeeks = Math.min(aggressiveWeeks, 520)

  const aggressiveDataPoints: ProjectionData[] = []
  for (let week = 1; week <= cappedAggressiveWeeks; week++) {
    aggressiveDataPoints.push({
      week,
      saved: Math.min(week * aggressiveWeeklySavings, targetAmount),
    })
  }

  // Calculate relaxed scenario (-20%)
  const relaxedWeeklySavings = weeklySavings * 0.8
  const relaxedWeeks = Math.ceil(targetAmount / relaxedWeeklySavings)
  const cappedRelaxedWeeks = Math.min(relaxedWeeks, 520)

  const relaxedDataPoints: ProjectionData[] = []
  for (let week = 1; week <= cappedRelaxedWeeks; week++) {
    relaxedDataPoints.push({
      week,
      saved: Math.min(week * relaxedWeeklySavings, targetAmount),
    })
  }

  return {
    weeksNeeded: cappedWeeks,
    dataPoints,
    aggressiveWeeks: cappedAggressiveWeeks,
    aggressiveDataPoints,
    relaxedWeeks: cappedRelaxedWeeks,
    relaxedDataPoints,
  }
}
