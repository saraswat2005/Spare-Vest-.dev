import type { MarketItem } from "@/components/market/global-markets"

// Generate realistic OHLC data for indices
const generateOHLCData = (basePrice: number, volatility: number, trend: number, days = 100) => {
  const data = []
  let currentPrice = basePrice
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days * 24; i++) {
    const date = new Date(startDate)
    date.setHours(date.getHours() + i)

    // Market hours effect (higher volatility during trading hours)
    const hour = date.getHours()
    const isMarketHours = hour >= 9 && hour <= 16
    const hourlyVolatility = isMarketHours ? volatility * 1.5 : volatility * 0.5

    // Generate OHLC
    const open = currentPrice
    const change = (Math.random() - 0.5) * hourlyVolatility + trend
    const high = open + Math.random() * hourlyVolatility * 0.5
    const low = open - Math.random() * hourlyVolatility * 0.5
    const close = open + change

    // Volume varies with volatility and market hours
    const baseVolume = Math.random() * 1000000000
    const volume = isMarketHours ? baseVolume * 2 : baseVolume * 0.3

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

export const mockIndices: MarketItem[] = [
  {
    id: "sp500",
    symbol: "S&P 500",
    name: "Standard & Poor's 500",
    country: "United States",
    flag: "🇺🇸",
    price: 4756.5,
    change: 23.45,
    changePercent: 0.49,
    volume: 3200000000,
    high: 4782.3,
    low: 4731.2,
    open: 4733.05,
    close: 4756.5,
    priceHistory: generateOHLCData(4733.05, 50, 0.1),
  },
  {
    id: "nasdaq",
    symbol: "NASDAQ",
    name: "NASDAQ Composite",
    country: "United States",
    flag: "🇺🇸",
    price: 14845.12,
    change: -45.67,
    changePercent: -0.31,
    volume: 4100000000,
    high: 14923.45,
    low: 14801.23,
    open: 14890.79,
    close: 14845.12,
    priceHistory: generateOHLCData(14890.79, 120, -0.2),
  },
  {
    id: "dow",
    symbol: "DOW",
    name: "Dow Jones Industrial Average",
    country: "United States",
    flag: "🇺🇸",
    price: 37689.54,
    change: 156.82,
    changePercent: 0.42,
    volume: 2800000000,
    high: 37745.67,
    low: 37532.89,
    open: 37532.72,
    close: 37689.54,
    priceHistory: generateOHLCData(37532.72, 200, 0.3),
  },
  {
    id: "ftse",
    symbol: "FTSE 100",
    name: "Financial Times Stock Exchange 100",
    country: "United Kingdom",
    flag: "🇬🇧",
    price: 7456.78,
    change: -12.34,
    changePercent: -0.17,
    volume: 1200000000,
    high: 7489.12,
    low: 7423.45,
    open: 7469.12,
    close: 7456.78,
    priceHistory: generateOHLCData(7469.12, 80, -0.1),
  },
  {
    id: "dax",
    symbol: "DAX",
    name: "Deutscher Aktienindex",
    country: "Germany",
    flag: "🇩🇪",
    price: 16234.89,
    change: 89.45,
    changePercent: 0.55,
    volume: 1800000000,
    high: 16278.34,
    low: 16145.67,
    open: 16145.44,
    close: 16234.89,
    priceHistory: generateOHLCData(16145.44, 150, 0.4),
  },
  {
    id: "nikkei",
    symbol: "Nikkei 225",
    name: "Nikkei Stock Average",
    country: "Japan",
    flag: "🇯🇵",
    price: 32789.63,
    change: 234.56,
    changePercent: 0.72,
    volume: 2100000000,
    high: 32845.78,
    low: 32555.12,
    open: 32555.07,
    close: 32789.63,
    priceHistory: generateOHLCData(32555.07, 300, 0.5),
  },
]
