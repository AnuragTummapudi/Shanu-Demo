import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
        <p className="text-sm font-medium text-foreground">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Active Dot for Line Charts
const CustomActiveDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={6} 
      fill="#4f46e5" 
      stroke="#ffffff" 
      strokeWidth={2}
      className="animate-pulse"
    />
  );
};

// Gradient Definitions Component
export const ChartGradients = () => (
  <defs>
    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
    </linearGradient>
    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
    </linearGradient>
    <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
    </linearGradient>
    <linearGradient id="colorInfo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
    </linearGradient>
  </defs>
);

// Enhanced Line Chart
interface EnhancedLineChartProps {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  height?: number;
  showArea?: boolean;
}

export const EnhancedLineChart: React.FC<EnhancedLineChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300,
  showArea = false 
}) => {
  const ChartComponent = showArea ? AreaChart : LineChart;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <ChartGradients />
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
        <XAxis 
          dataKey="month" 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {dataKeys.map((item, index) => (
          showArea ? (
            <Area
              key={item.key}
              type="monotone"
              dataKey={item.key}
              stroke={item.color}
              fill={`url(#color${index === 0 ? 'Primary' : index === 1 ? 'Success' : 'Warning'})`}
              strokeWidth={3}
              name={item.name}
            />
          ) : (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              stroke={item.color}
              strokeWidth={3}
              dot={{ fill: item.color, strokeWidth: 2, r: 4 }}
              activeDot={<CustomActiveDot />}
              name={item.name}
            />
          )
        ))}
      </ChartComponent>
    </ResponsiveContainer>
  );
};

// Enhanced Bar Chart
interface EnhancedBarChartProps {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  height?: number;
  horizontal?: boolean;
}

export const EnhancedBarChart: React.FC<EnhancedBarChartProps> = ({ 
  data, 
  dataKeys, 
  height = 300,
  horizontal = false 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout={horizontal ? 'horizontal' : 'vertical'}
      >
        <ChartGradients />
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
        <XAxis 
          type={horizontal ? 'number' : 'category'}
          dataKey={horizontal ? undefined : 'name'} 
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          type={horizontal ? 'category' : 'number'}
          dataKey={horizontal ? 'name' : undefined}
          stroke="#64748b" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        {dataKeys.map((item, index) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            fill={item.color}
            name={item.name}
            radius={[4, 4, 0, 0]}
            className="drop-shadow-sm"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Enhanced Pie Chart
interface EnhancedPieChartProps {
  data: any[];
  height?: number;
  innerRadius?: number;
  showLegend?: boolean;
}

export const EnhancedPieChart: React.FC<EnhancedPieChartProps> = ({ 
  data, 
  height = 250,
  innerRadius = 0,
  showLegend = true 
}) => {
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          className="drop-shadow-sm"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || colors[index % colors.length]}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );
};

// Radial Progress Chart
interface RadialProgressProps {
  data: any[];
  height?: number;
}

export const RadialProgress: React.FC<RadialProgressProps> = ({ data, height = 250 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={data}>
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise
          dataKey="value"
          fill="#4f46e5"
          className="drop-shadow-sm"
        />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

// Enhanced Animated Counter Component with error handling
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = React.useState(0);

  // Ensure value is a valid number
  const safeValue = React.useMemo(() => {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      return 0;
    }
    return Math.max(0, value); // Ensure non-negative
  }, [value]);

  React.useEffect(() => {
    if (safeValue === 0) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const currentCount = Math.floor((progress / duration) * safeValue);
        setCount(currentCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(safeValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [safeValue, duration]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Gradient Progress Ring
interface GradientProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export const GradientProgressRing: React.FC<GradientProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = '',
  children
}) => {
  // Ensure progress is a valid number between 0 and 100
  const safeProgress = React.useMemo(() => {
    if (typeof progress !== 'number' || isNaN(progress) || !isFinite(progress)) {
      return 0;
    }
    return Math.max(0, Math.min(100, progress));
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};