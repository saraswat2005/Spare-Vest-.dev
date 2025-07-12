"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, DollarSign, TrendingUp, LucidePieChart, Activity } from "lucide-react"
import { GlobalMarkets } from "@/components/market/global-markets"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RechartsPieChart,
  Cell,
  AreaChart,
  Area,
  Pie,
} from "recharts"

// Mock data for charts
const investmentData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 47500 },
  { month: "Mar", value: 46800 },
  { month: "Apr", value: 49200 },
  { month: "May", value: 52100 },
  { month: "Jun", value: 54800 },
  { month: "Jul", value: 53200 },
  { month: "Aug", value: 56700 },
  { month: "Sep", value: 58900 },
  { month: "Oct", value: 61200 },
  { month: "Nov", value: 63800 },
  { month: "Dec", value: 67500 },
]

const allocationData = [
  { name: "Stocks", value: 45, color: "#3B82F6" },
  { name: "Bonds", value: 25, color: "#10B981" },
  { name: "Real Estate", value: 15, color: "#F59E0B" },
  { name: "Crypto", value: 10, color: "#8B5CF6" },
  { name: "Cash", value: 5, color: "#6B7280" },
]

const recentTransactions = [
  { id: 1, type: "Buy", asset: "AAPL", amount: 2500, date: "2024-01-15", status: "completed" },
  { id: 2, type: "Sell", asset: "TSLA", amount: 1800, date: "2024-01-14", status: "completed" },
  { id: 3, type: "Buy", asset: "BTC", amount: 5000, date: "2024-01-13", status: "pending" },
  { id: 4, type: "Dividend", asset: "VOO", amount: 125, date: "2024-01-12", status: "completed" },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")

  const totalValue = 67500
  const totalGain = 22500
  const gainPercentage = 33.33

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your investments and market performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button size="sm">Add Investment</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpIcon className="h-3 w-3 mr-1" />+{gainPercentage}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${totalGain.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +12.5% this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <LucidePieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-xs text-blue-600 mt-1">
                <Activity className="h-3 w-3 mr-1" />3 new positions
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+8.2%</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                Above target
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Investment Growth</CardTitle>
                  <CardDescription>Portfolio performance over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  {["1M", "3M", "6M", "1Y", "ALL"].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={investmentData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                              <p className="text-lg font-semibold text-blue-600">
                                ${payload[0].value?.toLocaleString()}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Fund Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
              <CardDescription>Current portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{payload[0].payload.name}</p>
                              <p className="text-lg text-blue-600">{payload[0].value}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Markets Section */}
        <Card>
          <CardHeader>
            <CardTitle>Global Markets</CardTitle>
            <CardDescription>Real-time market data and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <GlobalMarkets />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest investment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        transaction.type === "Buy"
                          ? "default"
                          : transaction.type === "Sell"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {transaction.type}
                    </Badge>
                    <div>
                      <p className="font-medium">{transaction.asset}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
