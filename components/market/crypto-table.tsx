"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import type { MarketItem } from "./global-markets"

interface CryptoTableProps {
  markets: MarketItem[]
  onMarketClick: (market: MarketItem) => void
}

export function CryptoTable({ markets, onMarketClick }: CryptoTableProps) {
  const [sortBy, setSortBy] = useState<"symbol" | "price" | "change" | "volume" | "marketCap">("marketCap")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleSort = (column: "symbol" | "price" | "change" | "volume" | "marketCap") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder(column === "marketCap" ? "desc" : "asc")
    }
  }

  const sortedMarkets = [...markets].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortBy) {
      case "symbol":
        aValue = a.symbol
        bValue = b.symbol
        break
      case "price":
        aValue = a.price
        bValue = b.price
        break
      case "change":
        aValue = a.changePercent
        bValue = b.changePercent
        break
      case "volume":
        aValue = a.volume
        bValue = b.volume
        break
      case "marketCap":
        aValue = a.marketCap || 0
        bValue = b.marketCap || 0
        break
      default:
        aValue = a.marketCap || 0
        bValue = b.marketCap || 0
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
  })

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

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString()}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  const SortButton = ({
    column,
    children,
  }: { column: "symbol" | "price" | "change" | "volume" | "marketCap"; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(column)}
      className="h-auto p-0 font-semibold hover:bg-transparent"
    >
      {children}
      {sortBy === column && (
        <span className="ml-1">
          {sortOrder === "asc" ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
        </span>
      )}
    </Button>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="font-semibold">
                <SortButton column="symbol">Cryptocurrency</SortButton>
              </TableHead>
              <TableHead className="text-right font-semibold">
                <SortButton column="price">Price</SortButton>
              </TableHead>
              <TableHead className="text-right font-semibold">
                <SortButton column="change">24h Change</SortButton>
              </TableHead>
              <TableHead className="text-right font-semibold">
                <SortButton column="volume">Volume</SortButton>
              </TableHead>
              <TableHead className="text-right font-semibold">
                <SortButton column="marketCap">Market Cap</SortButton>
              </TableHead>
              <TableHead className="text-center font-semibold">Trend</TableHead>
              <TableHead className="text-center font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMarkets.map((market, index) => (
              <motion.tr
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700"
                onClick={() => onMarketClick(market)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {market.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{market.symbol}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{market.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-mono font-semibold text-gray-900 dark:text-white">
                    {formatPrice(market.price)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="space-y-1">
                    <div
                      className={`font-mono font-semibold ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {market.change >= 0 ? "+" : ""}${market.change.toFixed(2)}
                    </div>
                    <Badge
                      variant={market.changePercent >= 0 ? "default" : "destructive"}
                      className={`font-mono text-xs ${
                        market.changePercent >= 0
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {market.changePercent >= 0 ? "+" : ""}
                      {market.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-mono text-gray-600 dark:text-gray-400">${formatVolume(market.volume)}</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-mono text-gray-600 dark:text-gray-400">{formatMarketCap(market.marketCap)}</div>
                </TableCell>
                <TableCell className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      market.changePercent >= 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {market.changePercent >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarketClick(market)
                    }}
                    className="hover:bg-orange-50 dark:hover:bg-orange-900 hover:border-orange-300 dark:hover:border-orange-700"
                  >
                    View Chart
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
