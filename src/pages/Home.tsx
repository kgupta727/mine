import { useState } from 'react'
import GoalForm from '../components/GoalForm'
import ProjectionChart from '../components/ProjectionChart'
import RecommendationCard from '../components/RecommendationCard'
import RealisticGoalMeter from '../components/RealisticGoalMeter'
import SmartAlternatives from '../components/SmartAlternatives'
import { calculateProjection } from '../utils/calculateProjection'
import { downloadProjectionAsJSON } from '../utils/downloadJson'
import { formatCurrency, formatWeeksToDuration } from '../utils/formatters'

export default function Home() {
  const [goalName, setGoalName] = useState('')
  const [targetAmount, setTargetAmount] = useState(0)
  const [weeklySavings, setWeeklySavings] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [projection, setProjection] = useState<ReturnType<typeof calculateProjection> | null>(null)
  const [autoAdjustMode, setAutoAdjustMode] = useState(false)

  const handleFormSubmit = (name: string, amount: number, weekly: number, income: number) => {
    setGoalName(name)
    setTargetAmount(amount)
    setWeeklySavings(weekly)
    setMonthlyIncome(income)
    setAutoAdjustMode(false)

    const result = calculateProjection(amount, weekly)
    setProjection(result)
  }

  const handleAutoAdjust = () => {
    setAutoAdjustMode(true)
  }

  const handleExport = () => {
    if (projection) {
      downloadProjectionAsJSON(goalName, targetAmount, weeklySavings, projection.dataPoints)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-mine-bg text-mine-text font-inter flex flex-col">
      {/* Header */}
      <header className="border-b border-mine-border backdrop-blur-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-serif font-bold text-mine-text">
            Goal Path Simulator
          </h1>
          <p className="text-mine-text-secondary mt-3 text-lg font-light">
            Project your financial goals over time and achieve them with confidence.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column - Form */}
          <div className="overflow-y-auto">
            <div className="bg-mine-card rounded-2xl border border-mine-border p-8 shadow-soft">
              <h2 className="text-2xl font-serif font-bold mb-6 text-mine-text">Your Goal</h2>
              <GoalForm onSubmit={handleFormSubmit} />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 overflow-y-auto pb-6 pr-2">
            {projection && (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-mine-primary/10 to-mine-primary/5 rounded-2xl border border-mine-border p-6">
                    <p className="text-sm text-mine-text-secondary mb-2 font-medium">Time to Goal</p>
                    <p className="text-3xl font-serif font-bold text-mine-primary">
                      {formatWeeksToDuration(projection.weeksNeeded)}
                    </p>
                    <p className="text-xs text-mine-text-secondary mt-2">
                      {projection.weeksNeeded} weeks
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-mine-secondary/10 to-mine-secondary/5 rounded-2xl border border-mine-border p-6">
                    <p className="text-sm text-mine-text-secondary mb-2 font-medium">Total Savings</p>
                    <p className="text-3xl font-serif font-bold text-mine-secondary">
                      {formatCurrency(targetAmount)}
                    </p>
                    <p className="text-xs text-mine-text-secondary mt-2">
                      @ {formatCurrency(weeklySavings)}/week
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-mine-card rounded-2xl border border-mine-border p-6 shadow-soft">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-mine-text">Projection Timeline</h3>
                  <ProjectionChart
                    mainDataPoints={projection.dataPoints}
                    aggressiveDataPoints={projection.aggressiveDataPoints}
                    relaxedDataPoints={projection.relaxedDataPoints}
                    targetAmount={targetAmount}
                  />
                </div>

                {/* Recommendations */}
                <div className="bg-mine-card rounded-2xl border border-mine-border p-6 shadow-soft">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-mine-text">Smart Recommendations</h3>
                  <RecommendationCard
                    goalName={goalName}
                    targetAmount={targetAmount}
                    weeklySavings={weeklySavings}
                    monthlyIncome={monthlyIncome}
                    weeksNeeded={projection.weeksNeeded}
                    aggressiveWeeks={projection.aggressiveWeeks}
                  />
                </div>

                {/* Realistic Goal Meter */}
                <RealisticGoalMeter
                  weeklySavings={weeklySavings}
                  monthlyIncome={monthlyIncome}
                  targetAmount={targetAmount}
                  weeksNeeded={projection.weeksNeeded}
                />

                {/* Smart Alternatives */}
                <SmartAlternatives
                  goalName={goalName}
                  targetAmount={targetAmount}
                  weeklySavings={weeklySavings}
                  monthlyIncome={monthlyIncome}
                  weeksNeeded={projection.weeksNeeded}
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAutoAdjust}
                    className="flex-1 px-6 py-3 bg-mine-button/20 hover:bg-mine-button/30 text-mine-button font-semibold rounded-2xl
                               transition-all duration-200 hover:scale-[1.02] border border-mine-button/40 shadow-soft"
                  >
                    Auto-Adjust Budgets
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-mine-primary to-mine-secondary text-white font-semibold rounded-2xl
                               transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    Export JSON
                  </button>
                </div>

                {autoAdjustMode && (
                  <div className="p-4 bg-mine-secondary/10 border border-mine-secondary/30 rounded-2xl">
                    <p className="text-sm text-mine-secondary font-semibold mb-2">💡 Auto-Adjust Suggestion</p>
                    <p className="text-xs text-mine-text-secondary leading-relaxed">
                      To reach your goal in 12 weeks instead of {projection.weeksNeeded}, increase your weekly
                      savings to <span className="font-semibold text-mine-text">
                        {formatCurrency(Math.ceil(targetAmount / 12))}
                      </span>. This is{' '}
                      <span className="font-semibold text-mine-text">
                        {formatCurrency(Math.ceil(targetAmount / 12) - weeklySavings)}
                      </span>{' '}
                      more per week.
                    </p>
                  </div>
                )}
              </>
            )}

            {!projection && (
              <div className="bg-mine-card rounded-2xl border border-mine-border/50 p-12 text-center shadow-soft">
                <p className="text-mine-text-secondary text-sm">
                  👈 Enter your goal details on the left to see your projection
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-mine-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-mine-text-secondary">
            Mine Goal Path Simulator • Helping you achieve your financial goals
          </p>
        </div>
      </footer>
    </div>
  )
}
