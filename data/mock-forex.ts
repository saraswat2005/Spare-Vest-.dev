import type { MarketItem } from "@/components/market/global-markets"

// Generate realistic forex OHLC data
const generateForexOHLCData = (basePrice: number, volatility: number, trend: number, days = 100) => {
  const data = []
  let currentPrice = basePrice
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days * 24; i++) {
    const date = new Date(startDate)
    date.setHours(date.getHours() + i)

    // Forex markets are 24/5, higher volatility during overlap hours
    const hour = date.getHours()
    const isHighVolatility = (hour >= 8 && hour <= 12) || (hour >= 13 && hour <= 17) // London/NY overlap
    const hourlyVolatility = isHighVolatility ? volatility * 1.8 : volatility

    // Generate OHLC with smaller movements typical of forex
    const open = currentPrice
    const change = (Math.random() - 0.5) * hourlyVolatility + trend
    const high = open + Math.random() * hourlyVolatility * 0.3
    const low = open - Math.random() * hourlyVolatility * 0.3
    const close = open + change

    // Forex volume is estimated (no central exchange)
    const baseVolume = Math.random() * 500000000
    const volume = isHighVolatility ? baseVolume * 1.5 : baseVolume

    data.push({
      time: date.toISOString(),
      open: Math.max(0, open),
      high: Math.max(0, Math.max(open, close, high)),
      low: Math.max(0, Math.min(open, close, low)),
      close: Math.max(0, close),
      volume: volume,
      price: Math.max(0, close),
    })

    currentPrice = Math.max(0, close)
  }

  return data
}

export const mockForex: MarketItem[] = [
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    country: "European Union / United States",
    flag: "🇪🇺🇺🇸",
    price: 1.0847,
    change: 0.0023,
    changePercent: 0.21,
    volume: 1200000000,
    high: 1.0865,
    low: 1.0821,
    open: 1.0824,
    close: 1.0847,
    priceHistory: generateForexOHLCData(1.0824, 0.005, 0.0001),
  },
  {
    id: "gbpusd",
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    country: "United Kingdom / United States",
    flag: "🇬🇧🇺🇸",
    price: 1.2634,
    change: -0.0045,
    changePercent: -0.35,
    volume: 890000000,
    high: 1.2689,
    low: 1.2612,
    open: 1.2679,
    close: 1.2634,
    priceHistory: generateForexOHLCData(1.2679, 0.008, -0.0002),
  },
  {
    id: "usdjpy",
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    country: "United States / Japan",
    flag: "🇺🇸🇯🇵",
    price: 149.87,
    change: 0.45,
    changePercent: 0.3,
    volume: 1100000000,
    high: 150.23,
    low: 149.34,
    open: 149.42,
    close: 149.87,
    priceHistory: generateForexOHLCData(149.42, 0.8, 0.02),
  },
  {
    id: "audusd",
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    country: "Australia / United States",
    flag: "🇦🇺🇺🇸",
    price: 0.6523,
    change: -0.0012,
    changePercent: -0.18,
    volume: 450000000,
    high: 0.6547,
    low: 0.6501,
    open: 0.6535,
    close: 0.6523,
    priceHistory: generateForexOHLCData(0.6535, 0.006, -0.0001),
  },
  {
    id: "usdcad",
    symbol: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    country: "United States / Canada",
    flag: "🇺🇸🇨🇦",
    price: 1.3678,
    change: 0.0034,
    changePercent: 0.25,
    volume: 380000000,
    high: 1.3695,
    low: 1.3644,
    open: 1.3644,
    close: 1.3678,
    priceHistory: generateForexOHLCData(1.3644, 0.007, 0.0002),
  },
  {
    id: "usdchf",
    symbol: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    country: "United States / Switzerland",
    flag: "🇺🇸🇨🇭",
    price: 0.8934,
    change: -0.0021,
    changePercent: -0.23,
    volume: 320000000,
    high: 0.8967,
    low: 0.8912,
    open: 0.8955,
    close: 0.8934,
    priceHistory: generateForexOHLCData(0.8955, 0.005, -0.0001),
  },
]
