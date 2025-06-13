import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PayoutData {
  author: string;
  articles: number;
  totalPayout: number;
}

export const exportToPDF = (data: PayoutData[], title: string = 'Payout Report') => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Add title
  doc.setFontSize(20);
  doc.text(title, pageWidth / 2, 15, { align: 'center' });

  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 25, { align: 'center' });

  // Calculate totals
  const totalArticles = data.reduce((sum, row) => sum + row.articles, 0);
  const totalPayout = data.reduce((sum, row) => sum + row.totalPayout, 0);

  // Add summary
  doc.text(`Total Articles: ${totalArticles}`, 14, 35);
  doc.text(`Total Payout: $${totalPayout.toFixed(2)}`, 14, 42);

  // Create table
  autoTable(doc, {
    head: [['Author', 'Articles', 'Payout ($)']],
    body: data.map(row => [
      row.author,
      row.articles,
      row.totalPayout.toFixed(2)
    ]),
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [51, 51, 51],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 50 },
    didDrawPage: (data) => {
      // Add page number at the bottom of each page
      const pageNumber = doc.getCurrentPageInfo().pageNumber;
      const totalPages = doc.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `Page ${pageNumber} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
  });

  // Save the PDF
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
}; 