import jsPDF from 'jspdf';
import fs from 'fs';
import path from 'path';

const generatePDF = async () => {
    const doc = new jsPDF();
    let yPos = 10;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;

    // Title
    doc.setFontSize(20);
    doc.text('News Dashboard Project Documentation', margin, yPos);
    yPos += lineHeight * 2;

    // Project Overview
    doc.setFontSize(16);
    doc.text('Project Overview', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    const description = 'A responsive dashboard application for managing news articles and author payouts. Built with Next.js, TypeScript, and Tailwind CSS.';
    const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin);
    doc.text(descLines, margin, yPos);
    yPos += lineHeight * descLines.length + 5;

    // Features
    doc.setFontSize(16);
    doc.text('Key Features', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    const features = [
        '🔐 User Authentication with Clerk',
        '📰 News API Integration',
        '📊 Interactive Analytics',
        '💰 Payout Management',
        '📱 Responsive Design',
        '🌓 Dark Mode Support',
        '📤 Export to PDF/CSV',
        '🔍 Advanced Filtering'
    ];

    features.forEach(feature => {
        doc.text(feature, margin, yPos);
        yPos += lineHeight;
    });
    yPos += lineHeight;

    // Tech Stack
    doc.setFontSize(16);
    doc.text('Tech Stack', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    const techStack = [
        'Framework: Next.js 14 with App Router',
        'Language: TypeScript',
        'Styling: Tailwind CSS',
        'Authentication: Clerk',
        'State Management: Zustand',
        'UI Components: Radix UI',
        'Charts: Chart.js',
        'Forms: React Hook Form',
        'Data Fetching: Axios'
    ];

    techStack.forEach(tech => {
        doc.text(tech, margin, yPos);
        yPos += lineHeight;
    });

    // Save the PDF
    const outputPath = path.join(process.cwd(), 'project-documentation.pdf');
    doc.save(outputPath);
    console.log(`PDF generated successfully at: ${outputPath}`);
};

generatePDF().catch(console.error); 