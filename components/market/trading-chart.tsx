"use client"

import { useMemo, useState } from "react"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Line, Area, AreaChart, ReferenceLine } from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Volume2 } from "lucide-react"

interface TradingChartProps {
  data: Array<{
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    price: number
  }>
  timeframe: string
  symbol: string
  isPositive: boolean
}

export function TradingChart({ data, timeframe, symbol, isPositive }: TradingChartProps) {
  const [showVolume, setShowVolume] = useState(true)
  const [showMA, setShowMA] = useState(true)
  const [hoveredData, setHoveredData] = useState<any>(null)

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    // Filter and sample data based on timeframe
    let filteredData = data
    let sampleRate = 1

    switch (timeframe) {
      case "1H":
        filteredData = data.slice(-60)
        sampleRate = 1
        break
      case "1D":
        filteredData = data.slice(-24)
        sampleRate = 1
        break
      case "1W":
        filteredData = data.slice(-168)
        sampleRate = 7
        break
      case "1M":
        filteredData = data.slice(-720)
        sampleRate = 24
        break
      case "3M":
        filteredData = data.slice(-2160)
        sampleRate = 72
        break
      case "1Y":
        filteredData = data.slice(-8760)
        sampleRate = 168
        break
      case "5Y":
        filteredData = data
        sampleRate = 720
        break
      default:
        filteredData = data.slice(-24)
        sampleRate = 1
    }

    const sampledData = filteredData.filter((_, index) => index % sampleRate === 0)

    // Calculate moving averages
    const calculateMA = (data: any[], period: number, key = "close") => {
      return data.map((item, index) => {
        if (index < period - 1) return null
        const sum = data.slice(index - period + 1, index + 1).reduce((acc, curr) => acc + curr[key], 0)
        return sum / period
      })
    }

    const ma20 = calculateMA(sampledData, Math.min(20, sampledData.length))
    const ma50 = calculateMA(sampledData, Math.min(50, sampledData.length))
    const ma200 = calculateMA(sampledData, Math.min(200, sampledData.length))

    return sampledData.map((item, index) => {
      const date = new Date(item.time)
      let formattedTime = ""

      switch (timeframe) {
        case "1H":
          formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
          break
        case "1D":
          formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
          break
        case "1W":
          formattedTime = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
          break
        case "1M":
        case "3M":
          formattedTime = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          break
        case "1Y":
        case "5Y":
          formattedTime = date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          })
          break
        default:
          formattedTime = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
      }

      return {
        ...item,
        time: formattedTime,
        originalTime: item.time,
        index,
        ma20: ma20[index],
        ma50: ma50[index],
        ma200: ma200[index],
        // Use close price as main price for line chart
        price: item.close,
        // Normalize volume for display
        normalizedVolume: (item.volume / Math.max(...sampledData.map((d) => d.volume))) * 100,
      }
    })
  }, [data, timeframe])

  const formatPrice = (value: number) => {
    if (value >= 10000) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    } else if (value >= 1000) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value)
    } else if (value >= 1) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    } else {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      }).format(value)
    }
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e12) return `${(volume / 1e12).toFixed(2)}T`
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`
    return volume.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      setHoveredData(data)

      const originalTime = data.originalTime
      const formattedDate = new Date(originalTime).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      const getCurrencySymbol = () => {
        if (symbol.includes("/")) return ""
        if (symbol === "BTC" || symbol === "ETH" || symbol.length <= 4) return "$"
        return ""
      }

      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl backdrop-blur-sm min-w-[280px]">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{formattedDate}</p>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Open:</span>
                <span className="ml-2 font-mono font-semibold">
                  {getCurrencySymbol()}
                  {formatPrice(data.open)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Close:</span>
                <span
                  className={`ml-2 font-mono font-semibold ${data.close >= data.open ? "text-green-600" : "text-red-600"}`}
                >
                  {getCurrencySymbol()}
                  {formatPrice(data.close)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">High:</span>
                <span className="ml-2 font-mono font-semibold text-green-600">
                  {getCurrencySymbol()}
                  {formatPrice(data.high)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Low:</span>
                <span className="ml-2 font-mono font-semibold text-red-600">
                  {getCurrencySymbol()}
                  {formatPrice(data.low)}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-gray-500">Volume:</span>
              <span className="ml-2 font-mono font-semibold text-blue-600">
                {getCurrencySymbol()}
                {formatVolume(data.volume)}
              </span>
            </div>
          </div>

          {showMA && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
              <div className="text-xs space-y-1">
                {data.ma20 && (
                  <div>
                    <span className="text-blue-500">MA20:</span>
                    <span className="ml-2 font-mono">
                      {getCurrencySymbol()}
                      {formatPrice(data.ma20)}
                    </span>
                  </div>
                )}
                {data.ma50 && (
                  <div>
                    <span className="text-orange-500">MA50:</span>
                    <span className="ml-2 font-mono">
                      {getCurrencySymbol()}
                      {formatPrice(data.ma50)}
                    </span>
                  </div>
                )}
                {data.ma200 && (
                  <div>
                    <span className="text-purple-500">MA200:</span>
                    <span className="ml-2 font-mono">
                      {getCurrencySymbol()}
                      {formatPrice(data.ma200)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {symbol} • {timeframe}
          </p>
        </div>
      )
    } else {
      setHoveredData(null)
    }
    return null
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">No data available</div>
          <div className="text-sm">Chart data will appear here when available</div>
        </div>
      </div>
    )
  }

  const currentData = hoveredData || chartData[chartData.length - 1]
  const minPrice = Math.min(...chartData.map((d) => Math.min(d.low, d.high, d.open, d.close)))
  const maxPrice = Math.max(...chartData.map((d) => Math.max(d.low, d.high, d.open, d.close)))
  const priceRange = maxPrice - minPrice
  const padding = priceRange * 0.05

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Advanced Chart
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showVolume ? "default" : "outline"}
            size="sm"
            onClick={() => setShowVolume(!showVolume)}
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Volume
          </Button>
          <Button variant={showMA ? "default" : "outline"} size="sm" onClick={() => setShowMA(!showMA)}>
            MA
          </Button>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {hoveredData ? new Date(hoveredData.originalTime).toLocaleString() : "Current Price"}
            </div>
            <div className={`text-3xl font-bold font-mono ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {symbol.includes("/") ? "" : "$"}
              {formatPrice(currentData?.close || currentData?.price || 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              {symbol} • {timeframe}
            </div>
          </div>

          {currentData && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Open</div>
                <div className="font-mono font-semibold">
                  {symbol.includes("/") ? "" : "$"}
                  {formatPrice(currentData.open)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">High</div>
                <div className="font-mono font-semibold text-green-600">
                  {symbol.includes("/") ? "" : "$"}
                  {formatPrice(currentData.high)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Low</div>
                <div className="font-mono font-semibold text-red-600">
                  {symbol.includes("/") ? "" : "$"}
                  {formatPrice(currentData.low)}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Volume</div>
                <div className="font-mono font-semibold text-blue-600">{formatVolume(currentData.volume)}</div>
              </div>
            </div>
          )}
        </div>

        {showMA && (
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            {currentData?.ma20 && (
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                MA20: {symbol.includes("/") ? "" : "$"}
                {formatPrice(currentData.ma20)}
              </Badge>
            )}
            {currentData?.ma50 && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                MA50: {symbol.includes("/") ? "" : "$"}
                {formatPrice(currentData.ma50)}
              </Badge>
            )}
            {currentData?.ma200 && (
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                MA200: {symbol.includes("/") ? "" : "$"}
                {formatPrice(currentData.ma200)}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Main Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseLeave={() => setHoveredData(null)}
          >
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.4} />
                <stop offset="50%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.2} />
                <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.05} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#6B7280",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#6B7280",
                fontFamily: "ui-monospace, monospace",
              }}
              tickFormatter={formatPrice}
              domain={[minPrice - padding, maxPrice + padding]}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Current price reference line */}
            <ReferenceLine
              y={currentData?.close || currentData?.price || 0}
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeDasharray="5 5"
              strokeOpacity={0.6}
            />

            {/* Moving averages */}
            {showMA && (
              <>
                <Line
                  type="monotone"
                  dataKey="ma20"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                  strokeOpacity={0.8}
                />
                <Line
                  type="monotone"
                  dataKey="ma50"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                  strokeOpacity={0.8}
                />
                <Line
                  type="monotone"
                  dataKey="ma200"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                  strokeOpacity={0.8}
                />
              </>
            )}

            {/* Main price area */}
            <Area
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={3}
              fill={`url(#gradient-${symbol})`}
              dot={false}
              activeDot={{
                r: 8,
                fill: isPositive ? "#10B981" : "#EF4444",
                stroke: "#fff",
                strokeWidth: 3,
                filter: "url(#glow)",
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      {showVolume && (
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id={`volume-gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow-lg">
                        <p className="text-sm font-semibold">Volume: {formatVolume(payload[0].payload.volume)}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="normalizedVolume"
                stroke="#3B82F6"
                strokeWidth={1}
                fill={`url(#volume-gradient-${symbol})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
