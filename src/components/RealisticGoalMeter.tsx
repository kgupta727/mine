import { useEffect, useState } from 'react'

interface RealisticGoalMeterProps {
  weeklySavings: number
  monthlyIncome: number
  targetAmount: number
  weeksNeeded: number
}

interface GoalAnalysis {
  score: number // 0-100
  level: 'Highly Achievable' | 'Achievable' | 'Challenging' | 'Very Ambitious' | 'Unrealistic'
  color: string
  insights: string[]
  warnings: string[]
}

export default function RealisticGoalMeter({
  weeklySavings,
  monthlyIncome,
  targetAmount,
  weeksNeeded,
}: RealisticGoalMeterProps) {
  const [analysis, setAnalysis] = useState<GoalAnalysis | null>(null)

  useEffect(() => {
    const analyzeGoal = (): GoalAnalysis => {
      const monthlySavings = weeklySavings * 4.33
      const savingsRate = (monthlySavings / monthlyIncome) * 100
      const monthsNeeded = weeksNeeded / 4.33
      
      const insights: string[] = []
      const warnings: string[] = []
      let score = 100

      // Factor 1: Savings rate (ideal: 10-30%)
      if (savingsRate > 50) {
        score -= 30
        warnings.push(`You're trying to save ${savingsRate.toFixed(0)}% of your income - this may be unsustainable`)
      } else if (savingsRate > 40) {
        score -= 20
        warnings.push(`Saving ${savingsRate.toFixed(0)}% is aggressive but possible with discipline`)
      } else if (savingsRate >= 20 && savingsRate <= 30) {
        insights.push(`Your ${savingsRate.toFixed(0)}% savings rate is in the ideal range`)
      } else if (savingsRate < 10) {
        score -= 10
        insights.push(`At ${savingsRate.toFixed(0)}% savings rate, consider increasing if possible`)
      }

      // Factor 2: Timeline (ideal: 3-24 months)
      if (monthsNeeded < 2) {
        insights.push('Your goal is achievable in the very short term!')
      } else if (monthsNeeded <= 12) {
        insights.push('A reasonable timeline that maintains motivation')
      } else if (monthsNeeded <= 24) {
        score -= 10
        insights.push('Long-term goal - consider setting milestone rewards')
      } else {
        score -= 25
        warnings.push(`${Math.round(monthsNeeded)} months is a very long timeline - break into smaller goals`)
      }

      // Factor 3: Goal size relative to income
      const monthsOfIncome = targetAmount / monthlyIncome
      if (monthsOfIncome > 12) {
        score -= 20
        warnings.push('Goal exceeds a full year of income - ensure it\'s truly necessary')
      } else if (monthsOfIncome > 6) {
        score -= 10
        insights.push('This is a significant financial commitment')
      } else if (monthsOfIncome <= 2) {
        insights.push('Goal size is manageable relative to your income')
      }

      // Factor 4: Emergency savings check
      if (savingsRate > 30) {
        warnings.push('Ensure you maintain emergency savings while pursuing this goal')
      }

      // Determine level and color
      let level: GoalAnalysis['level']
      let color: string

      if (score >= 85) {
        level = 'Highly Achievable'
        color = '#10B981' // green
      } else if (score >= 70) {
        level = 'Achievable'
        color = '#06B6D4' // teal
      } else if (score >= 55) {
        level = 'Challenging'
        color = '#F59E0B' // amber
      } else if (score >= 40) {
        level = 'Very Ambitious'
        color = '#F97316' // orange
      } else {
        level = 'Unrealistic'
        color = '#EF4444' // red
      }

      return { score, level, color, insights, warnings }
    }

    setAnalysis(analyzeGoal())
  }, [weeklySavings, monthlyIncome, targetAmount, weeksNeeded])

  if (!analysis) return null

  return (
    <div className="bg-mine-card rounded-2xl border border-mine-border p-6 shadow-soft">
      <h3 className="text-2xl font-serif font-bold mb-4 text-mine-text">Goal Feasibility</h3>
      
      {/* Score meter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-mine-text">Feasibility Score</span>
          <span className="text-2xl font-bold" style={{ color: analysis.color }}>
            {analysis.score}/100
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out rounded-full"
            style={{
              width: `${analysis.score}%`,
              backgroundColor: analysis.color,
            }}
          />
        </div>
        
        <div className="mt-2 text-center">
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: `${analysis.color}20`,
              color: analysis.color,
            }}
          >
            {analysis.level}
          </span>
        </div>
      </div>

      {/* Insights */}
      {analysis.insights.length > 0 && (
        <div className="mb-4 space-y-2">
          {analysis.insights.map((insight, idx) => (
            <div key={idx} className="flex gap-2 text-sm">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <p className="text-mine-text-secondary">{insight}</p>
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <div className="space-y-2">
          {analysis.warnings.map((warning, idx) => (
            <div key={idx} className="flex gap-2 text-sm">
              <span className="text-orange-500 flex-shrink-0">⚠️</span>
              <p className="text-mine-text-secondary">{warning}</p>
            </div>
          ))}
        </div>
      )}

      {/* Key metrics */}
      <div className="mt-4 pt-4 border-t border-mine-border grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-mine-text-secondary">Savings Rate</p>
          <p className="font-semibold text-mine-text">
            {((weeklySavings * 4.33 / monthlyIncome) * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-mine-text-secondary">Months to Goal</p>
          <p className="font-semibold text-mine-text">
            {(weeksNeeded / 4.33).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  )
}
