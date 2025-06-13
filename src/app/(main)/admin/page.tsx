"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface PayoutRate {
  type: string;
  rate: number;
}

interface Author {
  name: string;
  articles: number;
  totalPayout: number;
}

export default function AdminDashboard() {
  const { user } = useUser();
  const [payoutRates, setPayoutRates] = useState<PayoutRate[]>([
    { type: "news", rate: 50 },
    { type: "blog", rate: 100 },
  ]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    // Load payout rates from localStorage
    const savedRates = localStorage.getItem("payoutRates");
    if (savedRates) {
      setPayoutRates(JSON.parse(savedRates));
    }

    // Fetch authors and their articles (mock data for now)
    const mockAuthors = [
      { name: "John Doe", articles: 15, totalPayout: 750 },
      { name: "Jane Smith", articles: 10, totalPayout: 500 },
      { name: "Bob Johnson", articles: 8, totalPayout: 400 },
    ];
    setAuthors(mockAuthors);
  }, []);

  const updatePayoutRate = (type: string, newRate: number) => {
    const updatedRates = payoutRates.map((rate) =>
      rate.type === type ? { ...rate, rate: newRate } : rate
    );
    setPayoutRates(updatedRates);
    localStorage.setItem("payoutRates", JSON.stringify(updatedRates));
  };

  const exportToCSV = () => {
    const csvContent =
      "Author,Articles,Total Payout\n" +
      authors
        .map(({ name, articles, totalPayout }) => `${name},${articles},${totalPayout}`)
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payout_report.csv";
    link.click();
  };

  const exportToPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.text("Payout Report", 20, 10);
    authors.forEach((author, index) => {
      const y = 20 + index * 10;
      doc.text(
        `${author.name}: ${author.articles} articles - $${author.totalPayout}`,
        20,
        y
      );
    });

    doc.save("payout_report.pdf");
  };

  if (!user?.publicMetadata?.role === "admin") {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payout Rates</CardTitle>
          </CardHeader>
          <CardContent>
            {payoutRates.map((rate) => (
              <div key={rate.type} className="flex items-center gap-4 mb-4">
                <span className="capitalize w-24">{rate.type}:</span>
                <Input
                  type="number"
                  value={rate.rate}
                  onChange={(e) =>
                    updatePayoutRate(rate.type, parseInt(e.target.value))
                  }
                  className="w-32"
                />
                <span>$ per article</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Article Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <BarChart
                width={500}
                height={300}
                data={authors}
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
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Author Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total Payout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.name}>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>{author.articles}</TableCell>
                  <TableCell>${author.totalPayout}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex gap-4 mt-6">
            <Button onClick={exportToCSV}>Export to CSV</Button>
            <Button onClick={exportToPDF}>Export to PDF</Button>
            <Button variant="outline">Export to Google Sheets</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 