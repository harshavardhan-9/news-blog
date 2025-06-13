
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NewsArticle } from '@/hooks/useNewsAPI';
import { Download, FileText, Table as TableIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

interface ExportOptionsProps {
  articles: NewsArticle[];
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ articles }) => {
  const { toast } = useToast();

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('News Articles Report', 20, 20);
      
      // Add generation date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      
      // Prepare data for table
      const tableData = articles.map(article => [
        article.title.substring(0, 40) + (article.title.length > 40 ? '...' : ''),
        article.author,
        article.type,
        article.category,
        new Date(article.publishedAt).toLocaleDateString()
      ]);
      
      // Add table
      doc.autoTable({
        head: [['Title', 'Author', 'Type', 'Category', 'Date']],
        body: tableData,
        startY: 45,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246] }
      });
      
      doc.save('news-articles-report.pdf');
      
      toast({
        title: "Export Successful",
        description: "PDF report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
      console.error('PDF export error:', error);
    }
  };

  const exportToCSV = () => {
    try {
      const csvData = articles.map(article => ({
        Title: article.title,
        Author: article.author,
        Type: article.type,
        Category: article.category,
        'Published Date': new Date(article.publishedAt).toLocaleDateString(),
        Description: article.description,
        Source: article.source.name
      }));
      
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'news-articles-report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: "CSV file has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate CSV file.",
        variant: "destructive",
      });
      console.error('CSV export error:', error);
    }
  };

  const exportToGoogleSheets = () => {
    try {
      // Create CSV data
      const csvData = articles.map(article => ({
        Title: article.title,
        Author: article.author,
        Type: article.type,
        Category: article.category,
        'Published Date': new Date(article.publishedAt).toLocaleDateString(),
        Description: article.description,
        Source: article.source.name
      }));
      
      const csv = Papa.unparse(csvData);
      
      // Create a Google Sheets URL with the CSV data
      const encodedData = encodeURIComponent(csv);
      const googleSheetsUrl = `https://docs.google.com/spreadsheets/create?usp=sharing`;
      
      // Open Google Sheets in a new tab
      window.open(googleSheetsUrl, '_blank');
      
      // Copy CSV to clipboard for easy pasting
      navigator.clipboard.writeText(csv).then(() => {
        toast({
          title: "Google Sheets Export",
          description: "Google Sheets opened. CSV data copied to clipboard - you can paste it into the sheet.",
        });
      }).catch(() => {
        toast({
          title: "Google Sheets Export",
          description: "Google Sheets opened. Please manually copy and paste the data.",
        });
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export to Google Sheets.",
        variant: "destructive",
      });
      console.error('Google Sheets export error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Options
        </CardTitle>
        <p className="text-sm text-gray-600">
          Export filtered articles in various formats
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button onClick={exportToPDF} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export as PDF ({articles.length} articles)
          </Button>
          
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" />
            Export as CSV ({articles.length} articles)
          </Button>
          
          <Button onClick={exportToGoogleSheets} variant="outline" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" />
            Export to Google Sheets ({articles.length} articles)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
