"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Settings, User, Coins, Target, Shield, LogOut, Trash2, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const [autoDebit, setAutoDebit] = useState(true)
  const [roundUpRule, setRoundUpRule] = useState("10")
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [goalAmount, setGoalAmount] = useState("5000")
  const [currentGoal, setCurrentGoal] = useState(950)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const goalProgress = (currentGoal / Number.parseInt(goalAmount)) * 100

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
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Settings</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Round-Up Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="h-5 w-5" />
                <span>Round-Up Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto-Debit</Label>
                  <p className="text-sm text-gray-600">Automatically invest round-ups</p>
                </div>
                <Switch checked={autoDebit} onCheckedChange={setAutoDebit} />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Round-Up Rule</Label>
                <Select value={roundUpRule} onValueChange={setRoundUpRule}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Round up to nearest ₹5</SelectItem>
                    <SelectItem value="10">Round up to nearest ₹10</SelectItem>
                    <SelectItem value="50">Round up to nearest ₹50</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">Currently rounding up to nearest ₹{roundUpRule}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Investment Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Goal Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Goal Tracker</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal-amount" className="text-base font-medium">
                  Target Goal
                </Label>
                <Input
                  id="goal-amount"
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  placeholder="Enter target amount"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    ₹{currentGoal} / ₹{goalAmount}
                  </span>
                </div>
                <Progress value={goalProgress} className="h-2" />
                <p className="text-sm text-gray-600">{goalProgress.toFixed(1)}% complete</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address
                  </Label>
                  <Input id="email" defaultValue="priya@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Multi-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>These actions are permanent and cannot be undone.</AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => setShowDeleteModal(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button size="lg">Save Changes</Button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete your account? This action cannot be undone and you will lose all your
                investment data.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
