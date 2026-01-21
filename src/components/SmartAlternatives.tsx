import { formatCurrency, formatWeeksToDuration } from '../utils/formatters'

interface SmartAlternativesProps {
  goalName: string
  targetAmount: number
  weeklySavings: number
  monthlyIncome: number
  weeksNeeded: number
}

interface Alternative {
  id: string
  title: string
  strategy: string
  weeklySavings: number
  weeksNeeded: number
  savings: number
  pros: string[]
  cons: string[]
  icon: string
}

export default function SmartAlternatives({
  goalName,
  targetAmount,
  weeklySavings,
  monthlyIncome,
  weeksNeeded,
}: SmartAlternativesProps) {
  const generateAlternatives = (): Alternative[] => {
    const alternatives: Alternative[] = []
    const monthlySavings = weeklySavings * 4.33
    const savingsRate = (monthlySavings / monthlyIncome) * 100

    // Alternative 1: Side Hustle Strategy
    const sideHustleWeekly = weeklySavings + 75 // Add $75/week from side hustle
    const sideHustleWeeks = Math.ceil(targetAmount / sideHustleWeekly)
    alternatives.push({
      id: '1',
      title: 'Side Hustle Boost',
      strategy: `Add $75/week from a side gig`,
      weeklySavings: sideHustleWeekly,
      weeksNeeded: sideHustleWeeks,
      savings: (weeksNeeded - sideHustleWeeks) * 7,
      pros: [
        `Reach goal ${formatWeeksToDuration(weeksNeeded - sideHustleWeeks)} faster`,
        'Learn new skills while earning',
        'Doesn\'t require cutting expenses'
      ],
      cons: [
        'Requires extra time commitment',
        'May impact work-life balance'
      ],
      icon: '💼'
    })

    // Alternative 2: Spending Cut Strategy
    if (savingsRate < 40) {
      const cutWeekly = weeklySavings * 1.3 // 30% increase
      const cutWeeks = Math.ceil(targetAmount / cutWeekly)
      alternatives.push({
        id: '2',
        title: 'Lean Spending Mode',
        strategy: `Cut non-essentials, save ${formatCurrency(cutWeekly)}/week`,
        weeklySavings: cutWeekly,
        weeksNeeded: cutWeeks,
        savings: (weeksNeeded - cutWeeks) * 7,
        pros: [
          `Save ${formatWeeksToDuration(weeksNeeded - cutWeeks)} of time`,
          'No extra work required',
          'Build better spending habits'
        ],
        cons: [
          'Requires lifestyle adjustments',
          'May feel restrictive short-term'
        ],
        icon: '✂️'
      })
    }

    // Alternative 3: Extended Timeline (if current is aggressive)
    if (savingsRate > 25) {
      const relaxedWeekly = weeklySavings * 0.7 // 30% decrease
      const relaxedWeeks = Math.ceil(targetAmount / relaxedWeekly)
      alternatives.push({
        id: '3',
        title: 'Sustainable Pace',
        strategy: `Reduce to ${formatCurrency(relaxedWeekly)}/week, extend timeline`,
        weeklySavings: relaxedWeekly,
        weeksNeeded: relaxedWeeks,
        savings: 0,
        pros: [
          'More comfortable financially',
          'Maintain quality of life',
          'Easier to sustain long-term'
        ],
        cons: [
          `Takes ${formatWeeksToDuration(relaxedWeeks - weeksNeeded)} longer`,
          'Goal delayed by opportunity cost'
        ],
        icon: '🎯'
      })
    }

    // Alternative 4: Hybrid approach
    const hybridWeekly = weeklySavings + 35 // Modest side income
    const hybridWeeks = Math.ceil(targetAmount / hybridWeekly)
    alternatives.push({
      id: '4',
      title: 'Balanced Hybrid',
      strategy: `Small cuts + modest side income`,
      weeklySavings: hybridWeekly,
      weeksNeeded: hybridWeeks,
      savings: (weeksNeeded - hybridWeeks) * 7,
      pros: [
        `Achieve ${formatWeeksToDuration(weeksNeeded - hybridWeeks)} earlier`,
        'Balanced approach',
        'Diversified strategy'
      ],
      cons: [
        'Requires effort on multiple fronts',
        'Moderate time commitment'
      ],
      icon: '⚖️'
    })

    return alternatives
  }

  const alternatives = generateAlternatives()

  return (
    <div className="bg-mine-card rounded-2xl border border-mine-border p-6 shadow-soft">
      <h3 className="text-2xl font-serif font-bold mb-4 text-mine-text">Smart Alternatives</h3>
      <p className="text-sm text-mine-text-secondary mb-6">
        Different strategies to reach your goal faster or more sustainably
      </p>

      <div className="space-y-4">
        {alternatives.map((alt, index) => (
          <div
            key={alt.id}
            className="p-4 bg-mine-bg rounded-xl border border-mine-border hover:border-mine-primary
                       transition-all duration-300 group"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{alt.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-mine-text mb-1 group-hover:text-mine-primary transition-colors">
                  {alt.title}
                </h4>
                <p className="text-sm text-mine-text-secondary mb-3">{alt.strategy}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="bg-white/50 rounded-lg p-2">
                    <p className="text-mine-text-secondary">Time to Goal</p>
                    <p className="font-semibold text-mine-primary">
                      {formatWeeksToDuration(alt.weeksNeeded)}
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2">
                    <p className="text-mine-text-secondary">Weekly Savings</p>
                    <p className="font-semibold text-mine-secondary">
                      {formatCurrency(alt.weeklySavings)}
                    </p>
                  </div>
                </div>

                {/* Pros */}
                <div className="mb-2">
                  {alt.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-xs text-mine-text-secondary mb-1">
                      <span className="text-green-500 flex-shrink-0">+</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div>
                  {alt.cons.map((con, idx) => (
                    <div key={idx} className="flex items-start gap-1 text-xs text-mine-text-secondary mb-1">
                      <span className="text-orange-500 flex-shrink-0">−</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
