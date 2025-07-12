import type { MarketItem } from "@/components/market/global-markets"

// Generate realistic crypto OHLC data with high volatility
const generateCryptoOHLCData = (basePrice: number, volatility: number, trend: number, days = 100) => {
  const data = []
  let currentPrice = basePrice
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days * 24; i++) {
    const date = new Date(startDate)
    date.setHours(date.getHours() + i)

    // Crypto markets are 24/7 with random volatility spikes
    const isVolatilitySpike = Math.random() < 0.05 // 5% chance of high volatility
    const hourlyVolatility = isVolatilitySpike ? volatility * 3 : volatility

    // Generate OHLC with crypto-typical high volatility
    const open = currentPrice
    const change = (Math.random() - 0.5) * hourlyVolatility + trend
    const high = open + Math.random() * hourlyVolatility * 0.8
    const low = open - Math.random() * hourlyVolatility * 0.8
    const close = open + change

    // Crypto volume varies wildly
    const baseVolume = Math.random() * 2000000000
    const volume = isVolatilitySpike ? baseVolume * 5 : baseVolume

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

export const mockCrypto: MarketItem[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 43567.89,
    change: 1234.56,
    changePercent: 2.92,
    volume: 28500000000,
    high: 44123.45,
    low: 42234.67,
    open: 42333.33,
    close: 43567.89,
    marketCap: 853000000000,
    priceHistory: generateCryptoOHLCData(42333.33, 2000, 50),
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2634.78,
    change: -89.45,
    changePercent: -3.28,
    volume: 15200000000,
    high: 2756.34,
    low: 2598.12,
    open: 2724.23,
    close: 2634.78,
    marketCap: 316000000000,
    priceHistory: generateCryptoOHLCData(2724.23, 150, -5),
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    price: 312.45,
    change: 8.67,
    changePercent: 2.85,
    volume: 1800000000,
    high: 318.9,
    low: 303.78,
    open: 303.78,
    close: 312.45,
    marketCap: 47000000000,
    priceHistory: generateCryptoOHLCData(303.78, 20, 1),
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "Ripple",
    price: 0.6234,
    change: 0.0456,
    changePercent: 7.89,
    volume: 2100000000,
    high: 0.6345,
    low: 0.5778,
    open: 0.5778,
    close: 0.6234,
    marketCap: 33000000000,
    priceHistory: generateCryptoOHLCData(0.5778, 0.05, 0.003),
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.4567,
    change: -0.0234,
    changePercent: -4.87,
    volume: 890000000,
    high: 0.4834,
    low: 0.4456,
    open: 0.4801,
    close: 0.4567,
    marketCap: 16000000000,
    priceHistory: generateCryptoOHLCData(0.4801, 0.03, -0.002),
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 98.76,
    change: 5.43,
    changePercent: 5.82,
    volume: 3200000000,
    high: 102.34,
    low: 93.21,
    open: 93.33,
    close: 98.76,
    marketCap: 42000000000,
    priceHistory: generateCryptoOHLCData(93.33, 8, 0.5),
  },
]
