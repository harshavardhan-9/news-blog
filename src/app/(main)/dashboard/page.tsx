"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useUser } from "@clerk/nextjs"

interface DashboardStats {
  totalArticles: number
  totalAuthors: number
  totalPayout: number
  articlesByType: {
    name: string
    articles: number
  }[]
  articlesByAuthor: {
    name: string
    articles: number
  }[]
}

export default function DashboardPage() {
  const { user } = useUser()
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalAuthors: 0,
    totalPayout: 0,
    articlesByType: [],
    articlesByAuthor: [],
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalArticles: 150,
      totalAuthors: 25,
      totalPayout: 7500,
      articlesByType: [
        { name: "News", articles: 80 },
        { name: "Blog", articles: 70 },
      ],
      articlesByAuthor: [
        { name: "John Doe", articles: 15 },
        { name: "Jane Smith", articles: 12 },
        { name: "Bob Johnson", articles: 10 },
        { name: "Alice Brown", articles: 8 },
        { name: "Charlie Wilson", articles: 7 },
      ],
    })
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalAuthors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalPayout}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Articles by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <BarChart
                width={500}
                height={300}
                data={stats.articlesByType}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="articles" fill="#8884d8" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <BarChart
                width={500}
                height={300}
                data={stats.articlesByAuthor}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="articles" fill="#82ca9d" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 