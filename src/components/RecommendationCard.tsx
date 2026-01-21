import { useEffect, useState } from 'react'
import { formatCurrency, formatWeeksToDuration, calculateFutureDate, formatDate } from '../utils/formatters'

interface Recommendation {
  id: string
  title: string
  description: string
  icon: string
}

interface RecommendationCardProps {
  goalName: string
  targetAmount: number
  weeklySavings: number
  monthlyIncome: number
  weeksNeeded: number
  aggressiveWeeks: number
}

export default function RecommendationCard({
  goalName,
  targetAmount,
  weeklySavings,
  monthlyIncome,
  weeksNeeded,
  aggressiveWeeks,
}: RecommendationCardProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading recommendations
    const timer = setTimeout(() => {
      const weeksSaved = weeksNeeded - aggressiveWeeks
      const additionalSavingsNeeded = (weeklySavings * 0.2)
      const monthlySavings = weeklySavings * 4.33
      const savingsRate = (monthlySavings / monthlyIncome) * 100
      const monthsNeeded = weeksNeeded / 4.33

      const recs: Recommendation[] = []

      // Smart recommendation 1: Boost savings
      if (savingsRate < 50) {
        recs.push({
          id: '1',
          title: 'Accelerate Your Goal',
          description: `Increase weekly savings by ${formatCurrency(additionalSavingsNeeded)} to reach "${goalName}" ${formatWeeksToDuration(weeksSaved)} faster. This would bring your total savings rate to ${(((weeklySavings + additionalSavingsNeeded) * 4.33 / monthlyIncome) * 100).toFixed(1)}%.`,
          icon: '📈',
        })
      }

      // Smart recommendation 2: Timeline with savings insights
      const remainingIncome = monthlyIncome - monthlySavings
      const dailyBudget = remainingIncome / 30
      recs.push({
        id: '2',
        title: 'Your Timeline & Budget',
        description: `You'll reach "${goalName}" on ${formatDate(calculateFutureDate(weeksNeeded))}. With ${formatCurrency(remainingIncome)}/month for expenses, you have about ${formatCurrency(dailyBudget)}/day for other needs.`,
        icon: '📅',
      })

      // Smart recommendation 3: Category-specific advice
      if (monthsNeeded < 6) {
        recs.push({
          id: '3',
          title: 'Short-Term Win Strategy',
          description: `This is a short-term goal! Consider putting your ${formatCurrency(weeklySavings)}/week into a high-yield savings account (4-5% APY) instead of checking. Every little bit helps.`,
          icon: '💰',
        })
      } else if (monthsNeeded >= 12) {
        recs.push({
          id: '3',
          title: 'Long-Term Milestone Plan',
          description: `Set quarterly milestones at ${formatCurrency(targetAmount / 4)} each. Celebrate reaching each one to maintain motivation over ${Math.round(monthsNeeded)} months.`,
          icon: '🎯',
        })
      } else {
        recs.push({
          id: '3',
          title: 'Mid-Term Strategy',
          description: `You're ${(weeksNeeded / 4.33 / 6 * 100).toFixed(0)}% through a 6-month timeframe. Review your progress monthly and adjust if your income or expenses change.`,
          icon: '📊',
        })
      }

      // Smart recommendation 4: Savings rate analysis
      if (savingsRate > 40) {
        recs.push({
          id: '4',
          title: 'High Savings Rate Alert',
          description: `You're saving ${savingsRate.toFixed(0)}% of income - impressive! But ensure you have a ${formatCurrency(monthlyIncome * 3)} emergency fund first before aggressive goal saving.`,
          icon: '🛡️',
        })
      } else if (savingsRate < 15) {
        recs.push({
          id: '4',
          title: 'Increase Savings Potential',
          description: `At ${savingsRate.toFixed(0)}% savings rate, you could potentially save more. Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. You might find ${formatCurrency((monthlyIncome * 0.2) - monthlySavings)} more per month.`,
          icon: '💡',
        })
      } else {
        recs.push({
          id: '4',
          title: 'Healthy Savings Rate',
          description: `Your ${savingsRate.toFixed(0)}% savings rate is solid! You're balancing current lifestyle with future goals effectively. Keep this momentum going.`,
          icon: '✨',
        })
      }

      setRecommendations(recs)
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [goalName, targetAmount, weeklySavings, monthlyIncome, weeksNeeded, aggressiveWeeks])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse border border-mine-border" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => (
        <div
          key={rec.id}
          className="p-4 bg-mine-card rounded-2xl border border-mine-border hover:border-mine-secondary
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
              <h3 className="font-semibold text-mine-text text-sm group-hover:text-mine-secondary transition-colors">
                {rec.title}
              </h3>
              <p className="text-xs text-mine-text-secondary mt-1 leading-relaxed">
                {rec.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
