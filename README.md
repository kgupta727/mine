# Goal Path Simulator - Mine

A polished micro-demo for financial goal projection. Part of the Mine personal finance suite.

## Features

✅ **Goal Input Form** - Set your financial goals with validation
✅ **Dynamic Projection Engine** - Calculate weeks to goal with three scenarios (main, aggressive, relaxed)
✅ **Interactive Chart** - Line chart visualization with smooth animations
✅ **Smart Recommendations** - AI-style suggestions based on your savings plan
✅ **Auto-Adjust Budgets** - Automatically calculate optimal weekly savings
✅ **Export to JSON** - Download your projection data

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd mine
npm install
```

### Development

```bash
npm run dev
```

Opens on `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Chart.js** - Data visualization

## File Structure

```
src/
├── components/
│   ├── GoalForm.tsx           # Goal input form with validation
│   ├── ProjectionChart.tsx    # Chart visualization component
│   └── RecommendationCard.tsx # AI-style recommendation cards
├── pages/
│   └── Home.tsx               # Main page layout
├── utils/
│   ├── calculateProjection.ts # Core projection engine
│   ├── formatters.ts          # Utility formatters
│   └── downloadJson.ts        # Export functionality
├── App.tsx
├── main.tsx
└── index.css
```

## Color Palette (Mine-Inspired)

- **Background**: `#0d0f12` (Deep Charcoal)
- **Card Background**: `#14171c`
- **Primary Accent**: `#6C47FF` (Purple)
- **Secondary Accent**: `#4E82F5` (Blue)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#d1d5db`

## Core Features Explained

### 1. Projection Engine
Given a target amount and weekly savings, calculates:
- Main plan weeks to reach goal
- Aggressive plan (+20% weekly savings)
- Relaxed plan (-20% weekly savings)

All scenarios generate data points for chart visualization.

### 2. Form Validation
- Validates goal name, target amount, and weekly savings
- Shows inline error messages
- Prevents invalid submissions

### 3. Chart Component
- 3-line chart: main, aggressive, and relaxed scenarios
- Interactive tooltips with currency formatting
- Smooth animations and responsive design

### 4. Recommendations
- Real-time calculation for acceleration suggestions
- Mock but high-quality AI-style recommendations
- Animated card reveals

### 5. Export
- Downloads projection data as JSON file
- Includes goal details and all data points
- Timestamped filename

## Edge Cases Handled

✓ Weekly savings > target amount (completes in 1 week)
✓ Huge targets (50k+) with chart responsiveness
✓ Negative or empty numbers prevented by validation
✓ Projected weeks > 520 capped at 10 years

## Design System

- **Rounded Corners**: `rounded-2xl` throughout
- **Shadows**: Soft, subtle shadows only
- **Hover Effects**: Scale 1.02 on buttons
- **Transitions**: All 200ms easing
- **Glass Effect**: Subtle backdrop blur on cards

## Animation Details

- **Fade-in**: Chart loads with fade
- **Slide-up**: Recommendation cards slide up with staggered delays
- **Smooth Curves**: All chart lines use cubic bezier curves

## Future Enhancements

- Backend integration for data persistence
- Multi-goal tracking
- Historical spending analysis
- Mobile app version
- More sophisticated AI recommendations

## License

MIT
