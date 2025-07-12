"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Coins,
  Shield,
  TrendingUp,
  Brain,
  Lock,
  Smartphone,
  BarChart3,
  Users,
  Award,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Coins,
    title: "Smart Round-Ups",
    description: "Automatically round up your purchases and invest the spare change",
    details: [
      "Automatic transaction rounding",
      "Customizable round-up amounts (₹5, ₹10, ₹50)",
      "Real-time investment tracking",
      "No minimum investment required",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Optimization",
    description: "Advanced algorithms optimize your portfolio for maximum returns",
    details: [
      "Machine learning portfolio rebalancing",
      "Risk assessment and management",
      "Market trend analysis",
      "Personalized investment strategies",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "USDT Stability",
    description: "Invest in stable USDT-backed funds with minimal volatility",
    details: [
      "Dollar-pegged stability",
      "Reduced crypto volatility",
      "Regulated fund management",
      "Transparent pricing",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Your investments are protected with enterprise-level security",
    details: [
      "256-bit SSL encryption",
      "Multi-factor authentication",
      "Cold storage for crypto assets",
      "Regular security audits",
    ],
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Seamless experience across all devices",
    details: [
      "Responsive web application",
      "Touch-optimized interface",
      "Offline transaction sync",
      "Push notifications",
    ],
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed insights into your investment performance",
    details: [
      "Real-time portfolio tracking",
      "Performance analytics",
      "Tax reporting tools",
      "Investment goal tracking",
    ],
    color: "from-yellow-500 to-orange-500",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6 flex items-center"
      >
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <div className="flex items-center space-x-2">
          <Coins className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SpareVest Features
          </span>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Smart Investing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how SpareVest combines cutting-edge technology with user-friendly design to make investing
            accessible, secure, and profitable for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl opacity-90">See how our features are making a difference</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Active Users", icon: Users },
              { number: "₹2.5Cr+", label: "Total Invested", icon: TrendingUp },
              { number: "15%", label: "Average Returns", icon: BarChart3 },
              { number: "99.9%", label: "Uptime", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 10 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience These Features?</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join thousands of smart investors who are already growing their wealth with SpareVest's innovative
                features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                    >
                      Start Investing Now
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/demo">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                      Try Demo
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
