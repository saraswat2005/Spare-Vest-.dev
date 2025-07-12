"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, X, Star, Plus } from "lucide-react"
import { TradingChart } from "./trading-chart"
import type { MarketItem } from "./global-markets"
import { motion } from "framer-motion"

interface MarketDetailModalProps {
  market: MarketItem
  isOpen: boolean
  onClose: () => void
}

const timeframes = [
  { label: "1H", value: "1H" },
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "1Y", value: "1Y" },
  { label: "5Y", value: "5Y" },
]

export function MarketDetailModal({ market, isOpen, onClose }: MarketDetailModalProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  const formatVolume = (volume: number) => {
    if (volume >= 1e12) return `${(volume / 1e12).toFixed(2)}T`
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`
    return volume.toString()
  }

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return "N/A"
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  const getCurrencySymbol = () => {
    if (market.symbol.includes("/")) return ""
    if (market.symbol === "BTC" || market.symbol === "ETH" || market.symbol.length <= 4) return "$"
    return "$"
  }

  const handleAddToWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
    // Here you would typically save to a backend or local storage
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {market.flag && <span className="text-4xl">{market.flag}</span>}
                <div>
                  <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                    {market.symbol}
                  </DialogTitle>
                  <div className="text-lg text-gray-600 dark:text-gray-400 font-normal">
                    {market.name}
                    {market.country && ` • ${market.country}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={isWatchlisted ? "default" : "outline"}
                  size="sm"
                  onClick={handleAddToWatchlist}
                  className="flex items-center gap-2"
                >
                  {isWatchlisted ? <Star className="h-4 w-4 fill-current" /> : <Plus className="h-4 w-4" />}
                  {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl lg:text-5xl font-bold font-mono text-gray-900 dark:text-white">
                  {getCurrencySymbol()}
                  {market.price >= 1 ? market.price.toLocaleString() : market.price.toFixed(4)}
                </div>
                <div
                  className={`flex items-center space-x-2 ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {market.change >= 0 ? <ArrowUpIcon className="h-6 w-6" /> : <ArrowDownIcon className="h-6 w-6" />}
                  <div className="text-xl font-semibold">
                    {market.change >= 0 ? "+" : ""}
                    {getCurrencySymbol()}
                    {Math.abs(market.change).toFixed(market.price < 1 ? 4 : 2)}
                  </div>
                  <Badge
                    variant={market.changePercent >= 0 ? "default" : "destructive"}
                    className={`text-lg px-3 py-1 ${
                      market.changePercent >= 0
                        ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {market.changePercent >= 0 ? "+" : ""}
                    {market.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Timeframe Selector */}
            <div className="flex flex-wrap gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe.value}
                  variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`px-4 transition-all duration-200 ${
                    selectedTimeframe === timeframe.value
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900"
                  }`}
                >
                  {timeframe.label}
                </Button>
              ))}
            </div>

            {/* Trading Chart */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <TradingChart
                  data={market.priceHistory}
                  timeframe={selectedTimeframe}
                  symbol={market.symbol}
                  isPositive={market.change >= 0}
                />
              </CardContent>
            </Card>

            {/* Market Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">24h High</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold font-mono text-green-600">
                      {getCurrencySymbol()}
                      {market.high >= 1 ? market.high.toLocaleString() : market.high.toFixed(4)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">24h Low</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold font-mono text-red-600">
                      {getCurrencySymbol()}
                      {market.low >= 1 ? market.low.toLocaleString() : market.low.toFixed(4)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">24h Volume</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold font-mono text-blue-600">
                      {getCurrencySymbol()}
                      {formatVolume(market.volume)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {market.marketCap ? "Market Cap" : "Open Price"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold font-mono text-purple-600">
                      {market.marketCap
                        ? formatMarketCap(market.marketCap)
                        : `${getCurrencySymbol()}${market.open >= 1 ? market.open.toLocaleString() : market.open.toFixed(4)}`}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Additional Market Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Market Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open</div>
                      <div className="text-lg font-semibold font-mono">
                        {getCurrencySymbol()}
                        {market.open >= 1 ? market.open.toLocaleString() : market.open.toFixed(4)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Close</div>
                      <div className="text-lg font-semibold font-mono">
                        {getCurrencySymbol()}
                        {market.close >= 1 ? market.close.toLocaleString() : market.close.toFixed(4)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volume</div>
                      <div className="text-lg font-semibold font-mono">
                        {getCurrencySymbol()}
                        {formatVolume(market.volume)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">High</div>
                      <div className="text-lg font-semibold font-mono text-green-600">
                        {getCurrencySymbol()}
                        {market.high >= 1 ? market.high.toLocaleString() : market.high.toFixed(4)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Low</div>
                      <div className="text-lg font-semibold font-mono text-red-600">
                        {getCurrencySymbol()}
                        {market.low >= 1 ? market.low.toLocaleString() : market.low.toFixed(4)}
                      </div>
                    </div>
                    {market.marketCap && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
                        <div className="text-lg font-semibold font-mono">{formatMarketCap(market.marketCap)}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
