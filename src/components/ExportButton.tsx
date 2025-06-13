import React from 'react';
import { Button } from './ui/button';
import { DownloadCloud } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { exportToPDF } from '@/lib/pdf-export';
import { exportToGoogleSheets } from '@/lib/google-sheets';
import { toast } from 'sonner';

interface ExportData {
  author: string;
  articles: number;
  totalPayout: number;
}

interface ExportButtonProps {
  data: ExportData[];
  onExportStart?: () => void;
  onExportComplete?: () => void;
  onError?: (error: Error) => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  onExportStart,
  onExportComplete,
  onError,
}) => {
  const handleExport = async (type: 'pdf' | 'csv' | 'sheets') => {
    try {
      onExportStart?.();
      toast.loading(`Preparing ${type.toUpperCase()} export...`);

      switch (type) {
        case 'pdf':
          exportToPDF(data, 'News Payout Report');
          break;

        case 'csv':
          const csvContent = [
            ['Author', 'Articles', 'Payout ($)'],
            ...data.map(row => [row.author, row.articles, row.totalPayout]),
          ]
            .map(row => row.join(','))
            .join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `news-payout-report-${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
          URL.revokeObjectURL(link.href);
          break;

        case 'sheets':
          await exportToGoogleSheets(data);
          break;
      }

      toast.success(`${type.toUpperCase()} export completed successfully!`);
      onExportComplete?.();
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(`Failed to export as ${type.toUpperCase()}`);
      onError?.(error as Error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px]">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('sheets')}>
          Export to Google Sheets
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 