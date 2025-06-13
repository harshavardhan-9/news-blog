"use client"

import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface PayoutRate {
  type: string
  rate: number
}

interface PayoutData {
  author: string
  articles: number
  totalPayout: number
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [payoutRates, setPayoutRates] = useState<PayoutRate[]>([
    { type: "news", rate: 50 },
    { type: "blog", rate: 30 },
  ])
  const [payoutData, setPayoutData] = useState<PayoutData[]>([])

  useEffect(() => {
    // Load payout rates from localStorage
    const savedRates = localStorage.getItem("payoutRates")
    if (savedRates) {
      setPayoutRates(JSON.parse(savedRates))
    }

    // Mock payout data - replace with real data in production
    setPayoutData([
      { author: "John Doe", articles: 5, totalPayout: 250 },
      { author: "Jane Smith", articles: 3, totalPayout: 150 },
      { author: "Bob Johnson", articles: 4, totalPayout: 200 },
    ])
  }, [])

  const handleRateChange = (type: string, value: string) => {
    const newRates = payoutRates.map((rate) =>
      rate.type === type ? { ...rate, rate: Number(value) } : rate
    )
    setPayoutRates(newRates)
    localStorage.setItem("payoutRates", JSON.stringify(newRates))
    toast({
      title: "Payout rate updated",
      description: `${type} rate has been set to $${value}`,
    })
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.autoTable({
      head: [["Author", "Articles", "Total Payout"]],
      body: payoutData.map((data) => [
        data.author,
        data.articles,
        `$${data.totalPayout}`,
      ]),
    })
    doc.save("payout-report.pdf")
  }

  const csvData = [
    ["Author", "Articles", "Total Payout"],
    ...payoutData.map((data) => [
      data.author,
      data.articles,
      `$${data.totalPayout}`,
    ]),
  ]

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold">Payout Rates</h2>
        <div className="grid gap-4">
          {payoutRates.map((rate) => (
            <div key={rate.type} className="grid gap-2">
              <Label htmlFor={rate.type}>
                {rate.type.charAt(0).toUpperCase() + rate.type.slice(1)} Rate ($)
              </Label>
              <Input
                id={rate.type}
                type="number"
                value={rate.rate}
                onChange={(e) => handleRateChange(rate.type, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold">Export Payout Report</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={exportToPDF}>Export as PDF</Button>
          <CSVLink
            data={csvData}
            filename="payout-report.csv"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Export as CSV
          </CSVLink>
          <Button
            onClick={() =>
              toast({
                title: "Coming Soon",
                description: "Google Sheets integration will be available soon!",
              })
            }
          >
            Export to Google Sheets
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Current Payouts</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2">Author</th>
                <th className="text-left p-2">Articles</th>
                <th className="text-left p-2">Total Payout</th>
              </tr>
            </thead>
            <tbody>
              {payoutData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 last:border-0"
                >
                  <td className="p-2">{data.author}</td>
                  <td className="p-2">{data.articles}</td>
                  <td className="p-2">${data.totalPayout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 