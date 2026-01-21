import { useState } from 'react'

interface GoalFormLightProps {
  onSubmit: (goalName: string, targetAmount: number, weeklySavings: number) => void
}

export default function GoalFormLight({ onSubmit }: GoalFormLightProps) {
  const [goalName, setGoalName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [weeklySavings, setWeeklySavings] = useState('')
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit(
      goalName,
      Number(targetAmount),
      Number(weeklySavings)
    )

    // Reset form
    setGoalName('')
    setTargetAmount('')
    setWeeklySavings('')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="goalNameLight"
          className="block text-sm font-medium text-mine-light-text mb-2"
        >
          Goal Name
        </label>
        <input
          id="goalNameLight"
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="e.g., MacBook Air, Apartment Deposit"
          className="w-full px-4 py-3 rounded-2xl bg-mine-light-bg border border-gray-300
                     text-mine-light-text placeholder-mine-light-text-secondary
                     focus:outline-none focus:border-mine-light-primary focus:ring-1 focus:ring-mine-light-primary
                     transition-all duration-200"
        />
        {errors.goalName && (
          <p className="text-red-600 text-xs mt-1">{errors.goalName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="targetAmountLight"
          className="block text-sm font-medium text-mine-light-text mb-2"
        >
          Target Amount (USD)
        </label>
        <input
          id="targetAmountLight"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="1200"
          className="w-full px-4 py-3 rounded-2xl bg-mine-light-bg border border-gray-300
                     text-mine-light-text placeholder-mine-light-text-secondary
                     focus:outline-none focus:border-mine-light-primary focus:ring-1 focus:ring-mine-light-primary
                     transition-all duration-200"
        />
        {errors.targetAmount && (
          <p className="text-red-600 text-xs mt-1">{errors.targetAmount}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="weeklySavingsLight"
          className="block text-sm font-medium text-mine-light-text mb-2"
        >
          Weekly Savings (USD)
        </label>
        <input
          id="weeklySavingsLight"
          type="number"
          value={weeklySavings}
          onChange={(e) => setWeeklySavings(e.target.value)}
          placeholder="50"
          className="w-full px-4 py-3 rounded-2xl bg-mine-light-bg border border-gray-300
                     text-mine-light-text placeholder-mine-light-text-secondary
                     focus:outline-none focus:border-mine-light-primary focus:ring-1 focus:ring-mine-light-primary
                     transition-all duration-200"
        />
        {errors.weeklySavings && (
          <p className="text-red-600 text-xs mt-1">{errors.weeklySavings}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-mine-light-primary to-mine-light-secondary
                   text-white font-semibold rounded-2xl
                   hover:scale-[1.02] transition-all duration-200
                   shadow-lg hover:shadow-xl
                   focus:outline-none focus:ring-2 focus:ring-mine-light-primary focus:ring-offset-2 focus:ring-offset-mine-light-bg"
      >
        Calculate Projection
      </button>
    </form>
  )
}
