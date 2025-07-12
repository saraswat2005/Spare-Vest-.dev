/**
 * Portfolio Rebalancing Logic - Adapted from Python version
 * Calculates optimal fund allocation for round-up investments
 */

class PortfolioRebalancer {
  constructor() {
    this.funds = [
      { name: "USDT Stable Fund", target: 0.6, balance: 0 },
      { name: "Growth Fund", target: 0.25, balance: 0 },
      { name: "Conservative Fund", target: 0.15, balance: 0 },
    ]
  }

  // Load portfolio data
  loadPortfolio(portfolioData) {
    if (portfolioData && portfolioData.length > 0) {
      this.funds = portfolioData.map((fund) => ({
        name: fund.name || fund.Fund,
        target: fund.target || fund.Target,
        balance: fund.balance || fund.Balance || 0,
      }))
    }
    this.validatePortfolio()
  }

  // Validate portfolio data
  validatePortfolio() {
    const totalTarget = this.funds.reduce((sum, fund) => sum + fund.target, 0)
    if (Math.abs(totalTarget - 1.0) > 0.001) {
      throw new Error("Fund targets must sum to 1.0")
    }

    const hasNegativeBalance = this.funds.some((fund) => fund.balance < 0)
    if (hasNegativeBalance) {
      throw new Error("Fund balances must not be negative")
    }
  }

  // Calculate current allocation percentages
  getCurrentAllocation() {
    const totalBalance = this.getTotalBalance()
    if (totalBalance === 0) return this.funds.map(() => 0)

    return this.funds.map((fund) => fund.balance / totalBalance)
  }

  // Get total portfolio balance
  getTotalBalance() {
    return this.funds.reduce((sum, fund) => sum + fund.balance, 0)
  }

  // Calculate rebalancing allocation for new money
  rebalance(dollarsToAdd, allowNegative = false) {
    const currentBalance = this.getTotalBalance()
    const newBalance = currentBalance + dollarsToAdd

    // Calculate target amounts for each fund
    const targetAmounts = this.funds.map((fund) => fund.target * newBalance)

    // Calculate dollars needed for each fund to reach target
    const dollarsNeeded = this.funds.map((fund, index) => targetAmounts[index] - fund.balance)

    // Check if negative contributions are needed but not allowed
    if (!allowNegative && dollarsNeeded.some((amount) => amount < 0)) {
      throw new Error("Must add more money for strictly positive rebalancing")
    }

    return dollarsNeeded
  }

  // Get allocation summary for display
  getAllocationSummary() {
    const currentAllocation = this.getCurrentAllocation()
    const totalBalance = this.getTotalBalance()

    return this.funds.map((fund, index) => ({
      name: fund.name,
      currentBalance: fund.balance,
      currentAllocation: currentAllocation[index],
      targetAllocation: fund.target,
      difference: currentAllocation[index] - fund.target,
      percentageOfTotal: totalBalance > 0 ? (fund.balance / totalBalance) * 100 : 0,
    }))
  }

  // Calculate rebalancing summary
  getRebalancingSummary(dollarsToAdd, allowNegative = false) {
    try {
      const rebalanceAmounts = this.rebalance(dollarsToAdd, allowNegative)
      const totalRebalance = rebalanceAmounts.reduce((sum, amount) => sum + Math.abs(amount), 0)

      return this.funds.map((fund, index) => ({
        name: fund.name,
        dollarsToAdd: rebalanceAmounts[index],
        allocation: totalRebalance > 0 ? (Math.abs(rebalanceAmounts[index]) / totalRebalance) * 100 : 0,
        targetAllocation: fund.target * 100,
        difference: totalRebalance > 0 ? (Math.abs(rebalanceAmounts[index]) / totalRebalance - fund.target) * 100 : 0,
      }))
    } catch (error) {
      throw error
    }
  }

  // Update fund balances after investment
  updateBalances(rebalanceAmounts) {
    this.funds.forEach((fund, index) => {
      fund.balance += rebalanceAmounts[index]
    })
  }

  // Simulate round-up investment
  simulateRoundUp(roundUpAmount) {
    try {
      const rebalanceAmounts = this.rebalance(roundUpAmount, false)
      const summary = this.getRebalancingSummary(roundUpAmount, false)

      // Update balances for simulation
      this.updateBalances(rebalanceAmounts)

      return {
        success: true,
        totalInvested: roundUpAmount,
        allocation: summary,
        newTotalBalance: this.getTotalBalance(),
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        totalInvested: 0,
        allocation: [],
        newTotalBalance: this.getTotalBalance(),
      }
    }
  }
}

// Export for use in the application
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioRebalancer
} else if (typeof window !== "undefined") {
  window.PortfolioRebalancer = PortfolioRebalancer
}

// Example usage and testing
console.log("Portfolio Rebalancer loaded successfully")

// Test the rebalancer with sample data
const rebalancer = new PortfolioRebalancer()
rebalancer.loadPortfolio([
  { name: "USDT Stable Fund", target: 0.6, balance: 570 },
  { name: "Growth Fund", target: 0.25, balance: 237.5 },
  { name: "Conservative Fund", target: 0.15, balance: 142.5 },
])

console.log("Current allocation:", rebalancer.getAllocationSummary())

// Simulate a ₹2.50 round-up investment
const result = rebalancer.simulateRoundUp(2.5)
console.log("Round-up simulation result:", result)
