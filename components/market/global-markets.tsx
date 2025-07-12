"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndexTable } from "./index-table"
import { ForexTable } from "./forex-table"
import { CryptoTable } from "./crypto-table"
import { MarketDetailModal } from "./market-detail-modal"
import { mockIndices } from "@/data/mock-indices"
import { mockForex } from "@/data/mock-forex"
import { mockCrypto } from "@/data/mock-crypto"
import { TrendingUp, DollarSign, Bitcoin } from "lucide-react"

export interface MarketItem {
  id: string
  symbol: string
  name: string
  country?: string
  flag?: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  open: number
  close: number
  marketCap?: number
  priceHistory: Array<{
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    price: number
  }>
}

export function GlobalMarkets() {
  const [selectedMarket, setSelectedMarket] = useState<MarketItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMarketClick = (market: MarketItem) => {
    setSelectedMarket(market)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMarket(null)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="indices" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger
            value="indices"
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Stock Indices</span>
            <span className="sm:hidden">Indices</span>
          </TabsTrigger>
          <TabsTrigger
            value="forex"
            className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Forex</span>
            <span className="sm:hidden">FX</span>
          </TabsTrigger>
          <TabsTrigger
            value="crypto"
            className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            <Bitcoin className="h-4 w-4" />
            <span className="hidden sm:inline">Cryptocurrency</span>
            <span className="sm:hidden">Crypto</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="indices" className="mt-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Global Stock Indices
              </CardTitle>
              <CardDescription>Major stock market indices from around the world</CardDescription>
            </CardHeader>
            <CardContent>
              <IndexTable markets={mockIndices} onMarketClick={handleMarketClick} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forex" className="mt-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Foreign Exchange
              </CardTitle>
              <CardDescription>Major currency pairs and exchange rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ForexTable markets={mockForex} onMarketClick={handleMarketClick} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="mt-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-orange-600" />
                Cryptocurrency Markets
              </CardTitle>
              <CardDescription>Top cryptocurrencies by market capitalization</CardDescription>
            </CardHeader>
            <CardContent>
              <CryptoTable markets={mockCrypto} onMarketClick={handleMarketClick} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedMarket && <MarketDetailModal market={selectedMarket} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
