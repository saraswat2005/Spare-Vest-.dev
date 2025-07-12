"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, BookOpen, Play, Clock, Star, TrendingUp, Shield, Coins, Target, ChevronRight } from "lucide-react"

const learningModules = [
  {
    id: 1,
    title: "What is USDT?",
    description: "Learn about Tether (USDT) and why it's a stable cryptocurrency",
    duration: "5 min read",
    difficulty: "Beginner",
    icon: Coins,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Round-Up Investing Basics",
    description: "Understand how spare change investing works",
    duration: "7 min read",
    difficulty: "Beginner",
    icon: Target,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Crypto Investment Safety",
    description: "Best practices for secure crypto investing",
    duration: "10 min read",
    difficulty: "Intermediate",
    icon: Shield,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Portfolio Diversification",
    description: "How to balance your investment portfolio",
    duration: "12 min read",
    difficulty: "Intermediate",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
  },
]

const faqs = [
  {
    question: "How does round-up investing work?",
    answer:
      "When you make a purchase, we round up the amount to the nearest rupee (or your chosen amount) and invest the difference. For example, if you spend ₹47.30, we'll round it up to ₹50 and invest the ₹2.70 difference in your chosen USDT funds.",
  },
  {
    question: "Is my money safe with USDT investments?",
    answer:
      "USDT (Tether) is a stablecoin pegged to the US Dollar, which means it maintains a stable value. However, like all investments, there are risks involved. We recommend diversifying your portfolio and only investing what you can afford to lose.",
  },
  {
    question: "Can I withdraw my investments anytime?",
    answer:
      "Yes, you can withdraw your investments at any time. However, there may be small transaction fees for crypto transfers, and market conditions may affect the exact amount you receive.",
  },
  {
    question: "How are my funds allocated across different investments?",
    answer:
      "Your funds are automatically allocated based on your risk profile and investment goals. You can adjust your allocation preferences in the settings. We use smart rebalancing to maintain your target allocation over time.",
  },
  {
    question: "What happens if I want to stop round-up investing?",
    answer:
      "You can pause or stop round-up investing at any time from your settings. Your existing investments will remain in your portfolio, but no new round-ups will be invested.",
  },
]

export default function LearningPage() {
  const [selectedModule, setSelectedModule] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Learning Center</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn Smart Investing</h1>
          <p className="text-gray-600">Master the basics of crypto investing and round-up strategies</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Modules</h2>
            <div className="grid gap-4">
              {learningModules.map((module) => (
                <Card key={module.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.color}`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-3">{module.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{module.duration}</span>
                          </div>
                          <Badge variant="outline">{module.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Quick Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Start Small</h4>
                  <p className="text-sm text-blue-700">
                    Begin with small round-ups to get comfortable with the process.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Stay Consistent</h4>
                  <p className="text-sm text-green-700">
                    Regular small investments often outperform large one-time investments.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Diversify</h4>
                  <p className="text-sm text-purple-700">
                    Spread your investments across different fund types for better risk management.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-red-500" />
                  <span>Video Tutorials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Getting Started</p>
                    <p className="text-xs text-gray-600">3:45</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">USDT Explained</p>
                    <p className="text-xs text-gray-600">5:20</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Play className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Risk Management</p>
                    <p className="text-xs text-gray-600">7:15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Schedule a Call
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
