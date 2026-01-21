import { useState } from 'react'

interface GoalFormProps {
  onSubmit: (goalName: string, targetAmount: number, weeklySavings: number, monthlyIncome: number) => void
}

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [goalName, setGoalName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [weeklySavings, setWeeklySavings] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!goalName.trim()) {
      newErrors.goalName = 'Goal name is required'
    }

    if (!targetAmount) {
      newErrors.targetAmount = 'Target amount is required'
    } else if (Number(targetAmount) <= 0) {
      newErrors.targetAmount = 'Amount must be positive'
    }

    if (!weeklySavings) {
      newErrors.weeklySavings = 'Weekly savings is required'
    } else if (Number(weeklySavings) <= 0) {
      newErrors.weeklySavings = 'Amount must be positive'
    }

    if (!monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required'
    } else if (Number(monthlyIncome) <= 0) {
      newErrors.monthlyIncome = 'Amount must be positive'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(
      goalName,
      Number(targetAmount),
      Number(weeklySavings),
      Number(monthlyIncome)
    )

    // Reset form
    setGoalName('')
    setTargetAmount('')
    setWeeklySavings('')
    setMonthlyIncome('')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="goalName"
          className="block text-sm font-medium text-mine-text mb-2"
        >
          Goal Name
        </label>
        <input
          id="goalName"
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="e.g., MacBook Air, Apartment Deposit"
          className="w-full px-4 py-3 rounded-2xl bg-mine-bg border border-mine-border
                     text-mine-text placeholder-mine-text-secondary
                     focus:outline-none focus:border-mine-primary focus:ring-1 focus:ring-mine-primary
                     transition-all duration-200"
        />
        {errors.goalName && (
          <p className="text-red-500 text-xs mt-1">{errors.goalName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="targetAmount"
          className="block text-sm font-medium text-mine-text mb-2"
        >
          Target Amount (USD)
        </label>
        <input
          id="targetAmount"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="1200"
          className="w-full px-4 py-3 rounded-2xl bg-mine-bg border border-mine-border
                     text-mine-text placeholder-mine-text-secondary
                     focus:outline-none focus:border-mine-primary focus:ring-1 focus:ring-mine-primary
                     transition-all duration-200"
        />
        {errors.targetAmount && (
          <p className="text-red-500 text-xs mt-1">{errors.targetAmount}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="weeklySavings"
          className="block text-sm font-medium text-mine-text mb-2"
        >
          Weekly Savings (USD)
        </label>
        <input
          id="weeklySavings"
          type="number"
          value={weeklySavings}
          onChange={(e) => setWeeklySavings(e.target.value)}
          placeholder="50"
          className="w-full px-4 py-3 rounded-2xl bg-mine-bg border border-mine-border
                     text-mine-text placeholder-mine-text-secondary
                     focus:outline-none focus:border-mine-primary focus:ring-1 focus:ring-mine-primary
                     transition-all duration-200"
        />
        {errors.weeklySavings && (
          <p className="text-red-500 text-xs mt-1">{errors.weeklySavings}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="monthlyIncome"
          className="block text-sm font-medium text-mine-text mb-2"
        >
          Monthly Income (USD)
        </label>
        <input
          id="monthlyIncome"
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          placeholder="2000"
          className="w-full px-4 py-3 rounded-2xl bg-mine-bg border border-mine-border
                     text-mine-text placeholder-mine-text-secondary
                     focus:outline-none focus:border-mine-primary focus:ring-1 focus:ring-mine-primary
                     transition-all duration-200"
        />
        {errors.monthlyIncome && (
          <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-mine-primary to-mine-secondary
                   text-white font-semibold rounded-2xl
                   hover:scale-[1.02] transition-all duration-200
                   shadow-lg hover:shadow-xl
                   focus:outline-none focus:ring-2 focus:ring-mine-primary focus:ring-offset-2 focus:ring-offset-mine-bg"
      >
        Calculate Projection
      </button>
    </form>
  )
}
