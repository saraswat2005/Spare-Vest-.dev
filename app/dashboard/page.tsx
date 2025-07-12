"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  TrendingUp,
  Wallet,
  BookOpen,
  ArrowUpRight,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  MessageCircle,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { AIChatbot } from "@/components/ai-chatbot"
import { ThemeToggle } from "@/components/theme-toggle"

const investmentData = [
  { date: "1 Jan", value: 0 },
  { date: "8 Jan", value: 125 },
  { date: "15 Jan", value: 280 },
  { date: "22 Jan", value: 450 },
  { date: "29 Jan", value: 620 },
  { date: "5 Feb", value: 780 },
  { date: "12 Feb", value: 950 },
]

const fundData = [
  { name: "USDT Stable Fund", value: 60, color: "#3B82F6" },
  { name: "Growth Fund", value: 25, color: "#10B981" },
  { name: "Conservative Fund", value: 15, color: "#F59E0B" },
]

const recentTransactions = [
  { id: 1, type: "Coffee", amount: 2.5, roundUp: 2.5, icon: Coffee, time: "2 hours ago" },
  { id: 2, type: "Grocery", amount: 7.25, roundUp: 2.75, icon: ShoppingBag, time: "5 hours ago" },
  { id: 3, type: "Fuel", amount: 12.8, roundUp: 2.2, icon: Car, time: "1 day ago" },
  { id: 4, type: "Rent", amount: 45.6, roundUp: 4.4, icon: Home, time: "2 days ago" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showChatbot, setShowChatbot] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <Coins className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpareVest
              </span>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>
            </motion.div>

            <Link href="/wallet">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Wallet</span>
                </Button>
              </motion.div>
            </Link>

            <Link href="/learning">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Learn</span>
                </Button>
              </motion.div>
            </Link>

            <Link href="/settings">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </motion.div>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div {...fadeInUp} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, <span className="text-blue-600">Priya!</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Here's how your investments are performing today
              </p>
            </div>
            <motion.div
              className="hidden md:block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              <div className="text-6xl">📈</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              title: "Total Invested",
              value: "₹950.00",
              change: "+12.5%",
              icon: TrendingUp,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Today's Round-Up",
              value: "₹2.50",
              change: "From 1 transaction",
              icon: Coins,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Fund Growth",
              value: "+₹118.75",
              change: "+12.5% total return",
              icon: ArrowUpRight,
              color: "from-purple-500 to-pink-500",
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.title}</CardTitle>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}
                  >
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600"
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Investment Growth Chart */}
                  <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-900 dark:text-white">Investment Growth</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={investmentData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-600" />
                          <XAxis dataKey="date" stroke="#666" className="dark:stroke-gray-400" />
                          <YAxis stroke="#666" className="dark:stroke-gray-400" />
                          <Tooltip
                            formatter={(value) => [`₹${value}`, "Investment"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "none",
                              borderRadius: "8px",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                            labelStyle={{ color: "#374151" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="url(#gradient)"
                            strokeWidth={3}
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Fund Allocation */}
                  <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Coins className="h-5 w-5 text-green-600" />
                        <span className="text-gray-900 dark:text-white">Fund Allocation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={fundData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {fundData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Allocation"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              border: "none",
                              borderRadius: "8px",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-4 space-y-3">
                        {fundData.map((fund, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: fund.color }} />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{fund.name}</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              {fund.value}%
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid gap-6"
                >
                  {fundData.map((fund, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fund.color }} />
                              <span className="text-gray-900 dark:text-white">{fund.name}</span>
                            </CardTitle>
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            >
                              {fund.value}% Allocation
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                ₹{((950 * fund.value) / 100).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Target Allocation</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">{fund.value}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
                              <p className="text-lg font-semibold text-green-600">+12.5%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {fund.name.includes("Conservative")
                                  ? "Low"
                                  : fund.name.includes("Stable")
                                    ? "Medium"
                                    : "High"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Coffee className="h-5 w-5 text-orange-600" />
                        <span className="text-gray-900 dark:text-white">Recent Round-Ups</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <transaction.icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-green-600">+₹{transaction.roundUp.toFixed(2)}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                from ₹{transaction.amount.toFixed(2)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot isOpen={showChatbot} onToggle={() => setShowChatbot(!showChatbot)} />

      {/* Floating Action Button for Chatbot */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: showChatbot
              ? "0 0 0 0 rgba(59, 130, 246, 0.7)"
              : [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: showChatbot ? 0 : Number.POSITIVE_INFINITY },
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  )
}
