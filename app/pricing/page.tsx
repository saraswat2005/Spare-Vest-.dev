"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coins, Check, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for beginners starting their investment journey",
    features: [
      "Round-up investing",
      "Basic portfolio tracking",
      "USDT stable fund access",
      "Mobile app access",
      "Email support",
    ],
    limitations: ["₹10,000 monthly investment limit", "Basic analytics only"],
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
  {
    name: "Growth",
    price: "₹99",
    period: "/month",
    description: "For serious investors who want advanced features",
    features: [
      "Unlimited round-up investing",
      "Advanced portfolio analytics",
      "All fund types access",
      "AI-powered rebalancing",
      "Priority support",
      "Tax reporting tools",
      "Goal tracking",
      "Custom round-up rules",
    ],
    limitations: [],
    popular: true,
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    description: "For professional investors and high-net-worth individuals",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Advanced AI strategies",
      "Custom portfolio allocation",
      "White-glove onboarding",
      "24/7 phone support",
      "Exclusive investment opportunities",
      "API access for developers",
    ],
    limitations: [],
    popular: false,
    color: "from-purple-500 to-pink-600",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function PricingPage() {
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
            SpareVest Pricing
          </span>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the plan that fits your investment goals. Start free and upgrade as you grow.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              No hidden fees
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Cancel anytime
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Coins className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                      size="lg"
                    >
                      {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
              },
              {
                question: "Are there any hidden fees?",
                answer:
                  "No hidden fees! The only additional costs are standard crypto network fees for withdrawals, which are clearly displayed before any transaction.",
              },
              {
                question: "What happens if I cancel my subscription?",
                answer:
                  "You can cancel anytime. Your account will remain active until the end of your billing period, after which you'll be moved to the free plan.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
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
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="mb-8 text-lg opacity-90">
                Our team is here to help you choose the right plan for your investment goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Contact Sales
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                    >
                      Start Free Trial
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
