"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export function AIChatbot({ isOpen, onToggle }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your SpareVest AI assistant. I can help you with investment questions, portfolio management, and understanding how round-up investing works. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    "How does round-up investing work?",
    "What is USDT?",
    "How to rebalance my portfolio?",
    "Is my investment safe?",
    "How to withdraw funds?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("round-up") || input.includes("round up")) {
      return "Round-up investing automatically rounds your purchases to the nearest rupee and invests the spare change. For example, if you spend ₹47.30, we round it to ₹50 and invest the ₹2.70 difference in your chosen USDT funds. It's a simple way to invest without thinking about it!"
    }

    if (input.includes("usdt")) {
      return "USDT (Tether) is a stablecoin pegged to the US Dollar, meaning its value remains relatively stable compared to other cryptocurrencies. This makes it an excellent choice for conservative investors who want crypto exposure without high volatility. Your SpareVest portfolio includes USDT-backed funds for stability."
    }

    if (input.includes("rebalance") || input.includes("portfolio")) {
      return "Portfolio rebalancing ensures your investments stay aligned with your target allocation. SpareVest automatically rebalances your portfolio when you add new funds through round-ups. Our AI optimizes the allocation across USDT Stable Fund (60%), Growth Fund (25%), and Conservative Fund (15%) based on your risk profile."
    }

    if (input.includes("safe") || input.includes("security") || input.includes("risk")) {
      return "Your investments are secured through multiple layers: 1) USDT stability reduces volatility, 2) Diversified fund allocation spreads risk, 3) Bank-grade encryption protects your data, 4) Regulated crypto exchanges ensure compliance. However, all investments carry some risk, and past performance doesn't guarantee future results."
    }

    if (input.includes("withdraw") || input.includes("cash out")) {
      return "You can withdraw your investments anytime through the Wallet section. Simply connect your crypto wallet, select the amount to withdraw, and confirm the transaction. Withdrawals typically process within 24 hours, though network fees may apply for crypto transfers."
    }

    if (input.includes("fees") || input.includes("cost")) {
      return "SpareVest charges a small management fee of 0.5% annually on your invested amount. There are no fees for round-ups or deposits. Withdrawal fees depend on the crypto network (usually ₹10-50 for USDT transfers). We believe in transparent, low-cost investing!"
    }

    if (input.includes("minimum") || input.includes("start")) {
      return "There's no minimum investment amount! You can start with just ₹1 from your first round-up. Our micro-investing approach makes it accessible for everyone to begin their investment journey, regardless of income level."
    }

    if (input.includes("tax") || input.includes("taxes")) {
      return "Crypto investments in India are subject to 30% tax on gains plus 1% TDS on transactions above ₹10,000. SpareVest provides detailed transaction reports to help with tax filing. Please consult a tax advisor for personalized advice based on your situation."
    }

    // Default response
    return "I understand you're asking about SpareVest. While I try to help with most questions, I might not have specific information about that topic. You can contact our support team for detailed assistance, or try asking about round-up investing, USDT, portfolio management, or account security. Is there anything specific about your investments I can help clarify?"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] z-50"
        >
          <Card className="h-full shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>SpareVest AI Assistant</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                  <div className="space-y-1">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => sendMessage(question)}
                        className="w-full text-left text-xs p-2 bg-white dark:bg-gray-700 rounded border hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about investing..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
