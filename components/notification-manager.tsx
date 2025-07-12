"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, X, CheckCircle, TrendingUp, Coins } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: string
  type: "success" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  icon?: React.ReactNode
}

export function NotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    // Check if browser supports notifications
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === "granted") {
        // Show welcome notification
        showNotification({
          type: "success",
          title: "Notifications Enabled!",
          message: "You'll now receive updates about your investments and round-ups.",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        })
      }
    }
  }

  const showNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]) // Keep only 5 notifications

    // Show browser notification if permission granted
    if (permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      })
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Simulate notifications for demo
  useEffect(() => {
    if (permission !== "granted") return

    const intervals = [
      // Round-up notification
      setInterval(() => {
        showNotification({
          type: "info",
          title: "Round-up Invested!",
          message: "₹2.50 from your coffee purchase has been invested in your portfolio.",
          icon: <Coins className="h-5 w-5 text-blue-500" />,
        })
      }, 30000), // Every 30 seconds for demo

      // Portfolio update
      setInterval(() => {
        showNotification({
          type: "success",
          title: "Portfolio Growing!",
          message: "Your investments are up 2.3% this week. Keep it up!",
          icon: <TrendingUp className="h-5 w-5 text-green-500" />,
        })
      }, 60000), // Every minute for demo
    ]

    return () => intervals.forEach(clearInterval)
  }, [permission])

  return (
    <>
      {/* Notification Permission Button */}
      {permission === "default" && (
        <Button variant="ghost" size="sm" onClick={requestPermission} className="relative">
          <Bell className="h-4 w-4" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </Button>
      )}

      {/* Notification Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Card className="w-80 shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {notification.icon}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.timestamp.toLocaleTimeString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
