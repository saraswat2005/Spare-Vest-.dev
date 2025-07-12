"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface TourStep {
  id: number
  title: string
  description: string
  target?: string
  position: "top" | "bottom" | "left" | "right" | "center"
  action?: () => void
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    title: "Welcome to SpareVest!",
    description:
      "Let's take a quick tour to show you how our micro-investing platform works. This will only take 2 minutes.",
    position: "center",
  },
  {
    id: 2,
    title: "Smart Round-Ups",
    description:
      "Every time you make a purchase, we round it up to the nearest rupee and invest the spare change automatically.",
    position: "center",
  },
  {
    id: 3,
    title: "USDT Stability",
    description:
      "Your investments go into stable USDT-backed funds, reducing volatility while maintaining growth potential.",
    position: "center",
  },
  {
    id: 4,
    title: "AI Portfolio Management",
    description: "Our AI automatically rebalances your portfolio across different fund types for optimal returns.",
    position: "center",
  },
  {
    id: 5,
    title: "Real Example",
    description:
      "Let's see how it works: You buy coffee for ₹47.30, we round it to ₹50 and invest the ₹2.70 difference.",
    position: "center",
  },
  {
    id: 6,
    title: "Growth Over Time",
    description:
      "Small amounts add up! With just ₹2-5 per transaction, users typically invest ₹500-1000 monthly without noticing.",
    position: "center",
  },
  {
    id: 7,
    title: "Ready to Start?",
    description:
      "Join thousands of smart investors who are already growing their wealth with spare change. Start with just ₹1!",
    position: "center",
  },
]

interface DemoTourProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoTour({ isOpen, onClose }: DemoTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying, currentStep])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const currentTourStep = tourSteps[currentStep]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Tour Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Step {currentStep + 1} of {tourSteps.length}
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-32">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSkip}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      {/* Visual Demo */}
                      <div className="mb-8">
                        {currentStep === 0 && (
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            👋
                          </motion.div>
                        )}
                        {currentStep === 1 && (
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <motion.div
                              className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <span className="text-2xl">☕</span>
                              <div className="text-sm mt-2">₹47.30</div>
                            </motion.div>
                            <motion.div
                              animate={{ x: [0, 10, 0] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowRight className="h-6 w-6 text-blue-600" />
                            </motion.div>
                            <motion.div
                              className="bg-green-100 dark:bg-green-900 p-4 rounded-lg"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                            >
                              <span className="text-2xl">💰</span>
                              <div className="text-sm mt-2">₹2.70 invested</div>
                            </motion.div>
                          </div>
                        )}
                        {currentStep === 2 && (
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            🛡️
                          </motion.div>
                        )}
                        {currentStep === 3 && (
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            🤖
                          </motion.div>
                        )}
                        {currentStep === 4 && (
                          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span>Coffee Purchase</span>
                              <span className="font-bold">₹47.30</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span>Rounded Amount</span>
                              <span className="font-bold">₹50.00</span>
                            </div>
                            <div className="border-t pt-2 flex items-center justify-between">
                              <span className="text-green-600 font-medium">Invested</span>
                              <span className="text-green-600 font-bold">₹2.70</span>
                            </div>
                          </div>
                        )}
                        {currentStep === 5 && (
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            📈
                          </motion.div>
                        )}
                        {currentStep === 6 && (
                          <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            🚀
                          </motion.div>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{currentTourStep.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        {currentTourStep.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t bg-gray-50 dark:bg-gray-800">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  {/* Auto-progress bar */}
                  {isPlaying && (
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <motion.div className="bg-blue-600 h-1 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}

                  <Button onClick={handleNext} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                    <span>{currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
