"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { GlobalMarkets } from "@/components/market/global-markets"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Global Markets</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlobalMarkets />
        </motion.div>
      </div>
    </div>
  )
}
