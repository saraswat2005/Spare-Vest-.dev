"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, TrendingUp, Coins, Star, Play, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { DemoTour } from "@/components/demo-tour"
import { ThemeToggle } from "@/components/theme-toggle"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  const [showDemoTour, setShowDemoTour] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10"
      >
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Coins className="h-8 w-8 text-blue-600" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SpareVest
          </span>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {["Features", "Pricing", "Security", "About"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Try Dashboard
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.div
              className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="h-4 w-4" />
              <span>Now with AI-powered portfolio optimization</span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Save Small,
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 block"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Grow Big
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Turn your spare change into smart investments. Automatically round up your transactions and invest in
            USDT-backed crypto funds with AI-powered optimization.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Try Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 hover:bg-white dark:hover:bg-gray-800"
                onClick={() => setShowDemoTour(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "₹2.5Cr+", label: "Invested" },
              { number: "15%", label: "Avg. Returns" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-60"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Why Choose SpareVest?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of micro-investing with our cutting-edge features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Coins,
              title: "Smart Round-Ups",
              description:
                "Automatically round up your purchases and invest the spare change in diversified USDT funds.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Shield,
              title: "USDT Stability",
              description:
                "Invest in stable USDT-backed funds that minimize volatility while maximizing growth potential.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: TrendingUp,
              title: "AI Optimization",
              description: "Our AI automatically rebalances your portfolio for optimal growth and risk management.",
              color: "from-purple-500 to-pink-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              See what our users are saying about their investment journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya S.",
                text: "I've saved ₹15,000 without even noticing! SpareVest makes investing effortless.",
                rating: 5,
                avatar: "👩‍💼",
              },
              {
                name: "Rahul M.",
                text: "The USDT stability gives me confidence. My portfolio has grown 12% this year.",
                rating: 5,
                avatar: "👨‍💻",
              },
              {
                name: "Anita K.",
                text: "Perfect for beginners like me. The app is so easy to use and understand.",
                rating: 5,
                avatar: "👩‍🎓",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <div className="flex mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="font-semibold">{testimonial.name}</p>
                      </div>
                    </div>
                    <p className="opacity-90 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands who are already growing their wealth with spare change. Start with just ₹1!
            </p>
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100"
                >
                  Try Dashboard Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-6 w-6" />
                <span className="text-xl font-bold">SpareVest</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Making investing accessible for everyone through smart micro-investments.
              </p>
              <div className="flex space-x-4">
                {["🐦", "📘", "📷", "💼"].map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.2, backgroundColor: "#3B82F6" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-lg">{emoji}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Security", href: "/security" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "/contact" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SpareVest. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>

      {/* Demo Tour */}
      <DemoTour isOpen={showDemoTour} onClose={() => setShowDemoTour(false)} />
    </div>
  )
}
