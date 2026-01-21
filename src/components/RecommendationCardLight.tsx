import { useEffect, useState } from 'react'
import { formatCurrency, formatWeeksToDuration, calculateFutureDate, formatDate } from '../utils/formatters'

interface Recommendation {
  id: string
  title: string
  description: string
  icon: string
}

interface RecommendationCardLightProps {
  goalName: string
  targetAmount: number
  weeklySavings: number
  weeksNeeded: number
  aggressiveWeeks: number
}

export default function RecommendationCardLight({
  goalName,
  targetAmount,
  weeklySavings,
  weeksNeeded,
  aggressiveWeeks,
}: RecommendationCardLightProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading recommendations
    const timer = setTimeout(() => {
      const weeksSaved = weeksNeeded - aggressiveWeeks
      const additionalSavingsNeeded = (weeklySavings * 0.2)

      const recs: Recommendation[] = [
        {
          id: '1',
          title: 'Boost Your Savings',
          description: `Increase weekly savings by ${formatCurrency(additionalSavingsNeeded)} to reach your goal ${formatWeeksToDuration(weeksSaved)} faster.`,
          icon: '📈',
        },
        {
          id: '2',
          title: 'Timeline Target',
          description: `At your current rate, you'll reach "${goalName}" on ${formatDate(calculateFutureDate(weeksNeeded))}.`,
          icon: '📅',
        },
        {
          id: '3',
          title: 'Milestone Progress',
          description: `You'll save ${formatCurrency(targetAmount / 2)} (50% of goal) in ${Math.ceil(weeksNeeded / 2)} weeks. Plan a celebration!`,
          icon: '🎯',
        },
      ]

      setRecommendations(recs)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [goalName, targetAmount, weeklySavings, weeksNeeded, aggressiveWeeks])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse border border-gray-200" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => (
        <div
          key={rec.id}
          className="p-4 bg-mine-light-card rounded-2xl border border-gray-200 hover:border-mine-light-primary
                     transition-all duration-300 hover:shadow-lg group
                     animate-in fade-in slide-in-from-bottom-3"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both',
            animationDuration: '0.5s',
          }}
        >
          <div className="flex gap-3">
            <div className="text-2xl flex-shrink-0">{rec.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-mine-light-text text-sm group-hover:text-mine-light-primary transition-colors">
                {rec.title}
              </h3>
              <p className="text-xs text-mine-light-text-secondary mt-1 leading-relaxed">
                {rec.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
