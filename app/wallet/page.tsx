"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Wallet, Copy, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react"

export default function WalletPage() {
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using MetaMask browser extension",
      popular: true,
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect using Coinbase Wallet",
      popular: false,
    },
    {
      name: "WalletConnect",
      icon: "📱",
      description: "Connect using mobile wallet",
      popular: false,
    },
  ]

  const handleConnectWallet = async (walletName: string) => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setConnectedWallet({
        name: walletName,
        address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
        balance: "1,250.00",
        network: "Ethereum Mainnet",
      })
      setIsConnecting(false)
    }, 2000)
  }

  const copyAddress = () => {
    if (connectedWallet) {
      navigator.clipboard.writeText(connectedWallet.address)
    }
  }

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
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Wallet Connection</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {!connectedWallet ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Your Wallet</h1>
              <p className="text-gray-600">Connect your crypto wallet to start investing with USDT</p>
            </div>

            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Make sure you're connected to the Ethereum network for USDT transactions.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {walletOptions.map((wallet, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{wallet.icon}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{wallet.name}</h3>
                            {wallet.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{wallet.description}</p>
                        </div>
                      </div>
                      <Button onClick={() => handleConnectWallet(wallet.name)} disabled={isConnecting}>
                        {isConnecting ? "Connecting..." : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">Don't have a crypto wallet?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
                    Get MetaMask <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wallet.coinbase.com" target="_blank" rel="noopener noreferrer">
                    Get Coinbase Wallet <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Connected!</h1>
              <p className="text-gray-600">Your {connectedWallet.name} wallet is now connected</p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Wallet Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wallet Type</span>
                  <span className="font-medium">{connectedWallet.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Network</span>
                  <Badge variant="outline">{connectedWallet.network}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                      {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">USDT Balance</span>
                  <span className="font-semibold text-lg">${connectedWallet.balance}</span>
                </div>
              </CardContent>
            </Card>

            <Alert className="mb-6">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your wallet is ready for USDT investments. Round-ups will be automatically invested from your connected
                wallet.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={() => setConnectedWallet(null)} className="flex-1">
                Disconnect Wallet
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
