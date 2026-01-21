import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ProjectionData } from '../utils/calculateProjection'
import { formatCurrency } from '../utils/formatters'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

interface ProjectionChartLightProps {
  mainDataPoints: ProjectionData[]
  aggressiveDataPoints: ProjectionData[]
  relaxedDataPoints: ProjectionData[]
  targetAmount: number
}

export default function ProjectionChartLight({
  mainDataPoints,
  aggressiveDataPoints,
  relaxedDataPoints,
  targetAmount,
}: ProjectionChartLightProps) {
  if (mainDataPoints.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-mine-light-text-secondary">
        <p>Enter a goal to see the projection</p>
      </div>
    )
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#6B7280',
        borderColor: '#FFB83D',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(
          ...mainDataPoints.map((p) => p.saved),
          ...aggressiveDataPoints.map((p) => p.saved),
          ...relaxedDataPoints.map((p) => p.saved)
        ) * 1.1,
        ticks: {
          color: '#6B7280',
          callback: function (value: any) {
            return formatCurrency(value)
          },
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: '#6B7280',
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  }

  const chartData = {
    labels: mainDataPoints.map((p) => `Week ${p.week}`),
    datasets: [
      {
        label: 'Main Plan',
        data: mainDataPoints.map((p) => p.saved),
        borderColor: '#FFB83D',
        backgroundColor: 'rgba(255, 184, 61, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFB83D',
        borderWidth: 2,
      },
      {
        label: 'Aggressive (+20%)',
        data: aggressiveDataPoints.map((p) => p.saved),
        borderColor: '#2563EB',
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563EB',
        borderWidth: 2,
        borderDash: [5, 5],
      },
      {
        label: 'Relaxed (-20%)',
        data: relaxedDataPoints.map((p) => p.saved),
        borderColor: '#9CA3AF',
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#9CA3AF',
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  }

  return (
    <div className="space-y-4">
      {/* Custom legend */}
      <div className="flex flex-wrap gap-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-mine-light-primary"></div>
          <span className="text-xs font-medium text-mine-light-text">Main Plan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-mine-light-secondary"></div>
          <span className="text-xs font-medium text-mine-light-text">Aggressive (+20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-xs font-medium text-mine-light-text">Relaxed (-20%)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 bg-mine-light-card rounded-2xl p-4 border border-gray-200">
        <Line data={chartData} options={options} />
      </div>

      {/* Target line info */}
      <div className="px-4 py-3 bg-mine-light-card rounded-2xl border border-gray-200">
        <p className="text-sm text-mine-light-text-secondary">
          Target: <span className="font-semibold text-mine-light-text">{formatCurrency(targetAmount)}</span>
        </p>
      </div>
    </div>
  )
}
