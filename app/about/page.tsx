"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Coins, Target, Award, Heart, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const team = [
  {
    name: "Arjun Sharma",
    role: "CEO & Co-Founder",
    bio: "Former Goldman Sachs analyst with 8+ years in fintech. Passionate about democratizing investing.",
    avatar: "👨‍💼",
  },
  {
    name: "Priya Patel",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer specializing in AI and blockchain. Built scalable systems for millions of users.",
    avatar: "👩‍💻",
  },
  {
    name: "Rahul Gupta",
    role: "Head of Product",
    bio: "Product leader from Paytm with expertise in user experience and financial products.",
    avatar: "👨‍🎨",
  },
  {
    name: "Sneha Reddy",
    role: "Head of Compliance",
    bio: "Former RBI official ensuring regulatory compliance and user protection.",
    avatar: "👩‍⚖️",
  },
]

const milestones = [
  { year: "2023", event: "SpareVest founded with vision to democratize investing" },
  { year: "2023", event: "Secured ₹5Cr seed funding from leading VCs" },
  { year: "2024", event: "Launched beta with 1,000 early users" },
  { year: "2024", event: "Reached 50,000+ active users and ₹2.5Cr+ invested" },
  { year: "2024", event: "Introduced AI-powered portfolio optimization" },
]

const values = [
  {
    icon: Heart,
    title: "User-First",
    description: "Every decision we make prioritizes our users' financial wellbeing and success.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "Clear, honest communication about fees, risks, and how your money is invested.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Leveraging cutting-edge technology to make investing accessible and intelligent.",
  },
  {
    icon: Globe,
    title: "Inclusion",
    description: "Making wealth building accessible to everyone, regardless of income level.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <Coins className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About SpareVest
            </span>
          </div>
        </div>
        <ThemeToggle />
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission is to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Democratize Investing
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves access to smart investing tools, regardless of their income level. SpareVest
            makes it possible to build wealth with just spare change.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    SpareVest was born from a simple observation: millions of Indians want to invest but feel
                    overwhelmed by complexity, high minimums, and market volatility.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Our founders, having worked at top financial institutions, saw how technology could make investing
                    as simple as spending money. By combining micro-investing with stable USDT funds and AI
                    optimization, we created a platform that works for everyone.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Today, we're proud to help thousands of users build wealth automatically, one rupee at a time.
                  </p>
                </div>
                <motion.div
                  className="text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-8xl mb-4">🚀</div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Building the future of investing</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-6 h-full shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-center mb-12">SpareVest by the Numbers</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { number: "50,000+", label: "Active Users" },
                  { number: "₹2.5Cr+", label: "Total Invested" },
                  { number: "15%", label: "Average Returns" },
                  { number: "99.9%", label: "Uptime" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 10 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Be part of the financial revolution. Start building wealth with spare change today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                    >
                      Start Investing
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/careers">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                      Join Our Team
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
