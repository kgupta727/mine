import { ProjectionData } from './calculateProjection'

/**
 * Export projection data as JSON file
 */
export function downloadProjectionAsJSON(
  goalName: string,
  targetAmount: number,
  weeklySavings: number,
  projection: ProjectionData[]
): void {
  const data = {
    goalName,
    targetAmount,
    weeklySavings,
    projection,
    exportedAt: new Date().toISOString(),
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${goalName.replace(/\s+/g, '_')}_projection_${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
