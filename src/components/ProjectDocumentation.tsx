
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const ProjectDocumentation = () => {
  const generateProjectPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const lineHeight = 7;
    const margin = 20;
    
    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      if (text.length > 80) {
        const lines = doc.splitTextToSize(text, 170);
        lines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      } else {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(text, margin, yPosition);
        yPosition += lineHeight;
      }
      yPosition += 3;
    };

    const addSection = (title: string) => {
      yPosition += 10;
      addText(title, 16, true);
      yPosition += 5;
    };

    const addSubSection = (title: string) => {
      yPosition += 5;
      addText(title, 14, true);
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('News Dashboard Project Documentation', margin, yPosition);
    yPosition += 20;

    // Project Overview
    addSection('PROJECT OVERVIEW');
    addText('A comprehensive news dashboard application with user authentication, article management, analytics, and data export capabilities. Built with modern React technologies and responsive design.');

    // Tech Stack
    addSection('TECHNOLOGY STACK');
    
    addSubSection('Frontend Framework:');
    addText('• React 18.3.1 - Modern React with hooks and functional components');
    addText('• TypeScript - Type-safe JavaScript development');
    addText('• Vite - Fast build tool and development server');

    addSubSection('UI Framework:');
    addText('• Tailwind CSS - Utility-first CSS framework');
    addText('• shadcn/ui - Modern React component library');
    addText('• Radix UI - Headless UI primitives');

    addSubSection('State Management & Data:');
    addText('• React Query (@tanstack/react-query) - Server state management');
    addText('• React Context API - Authentication state management');
    addText('• Local Storage - User session persistence');

    addSubSection('Routing & Navigation:');
    addText('• React Router DOM 6.26.2 - Client-side routing');

    addSubSection('Charts & Visualization:');
    addText('• Recharts 2.15.3 - Responsive chart library');
    addText('• Bar charts for author and category analytics');
    addText('• Pie charts for article type distribution');

    addSubSection('Export Capabilities:');
    addText('• jsPDF 3.0.1 - PDF generation');
    addText('• jsPDF-AutoTable 5.0.2 - Table formatting in PDFs');
    addText('• PapaParse 5.5.3 - CSV file generation');

    addSubSection('Icons & UI Elements:');
    addText('• Lucide React 0.462.0 - Icon library');
    addText('• Sonner - Toast notifications');

    // Architecture
    addSection('PROJECT ARCHITECTURE');
    
    addSubSection('Authentication System:');
    addText('• Context-based authentication with AuthProvider');
    addText('• Mock authentication system (demo purposes)');
    addText('• Role-based access (admin@news.com for admin access)');
    addText('• Session persistence with localStorage');

    addSubSection('Component Structure:');
    addText('• LoginForm - User authentication interface');
    addText('• Dashboard - Main application interface');
    addText('• NewsChart - Data visualization components');
    addText('• PayoutTable - Financial calculations and display');
    addText('• ExportOptions - PDF/CSV/Google Sheets export');
    addText('• Header/Footer - Navigation and branding');

    addSubSection('Custom Hooks:');
    addText('• useNewsAPI - News data fetching and management');
    addText('• useAuth - Authentication state management');
    addText('• useToast - Notification system');

    // APIs and Data Sources
    addSection('APIs AND DATA SOURCES');
    
    addSubSection('News API Integration:');
    addText('• Currently using mock data for demonstration');
    addText('• Structured for easy integration with News API (newsapi.org)');
    addText('• Article schema includes: title, description, author, category, type');
    addText('• Support for both news articles and blog posts');

    addSubSection('Data Structure:');
    addText('• NewsArticle interface with comprehensive metadata');
    addText('• Categories: Technology, Environment, Business, Science, Sports');
    addText('• Article types: news, blog');
    addText('• Author tracking and analytics');

    // Features
    addSection('KEY FEATURES');
    
    addText('• User Authentication with role-based access');
    addText('• Responsive dashboard with news article display');
    addText('• Advanced filtering and search capabilities');
    addText('• Interactive data visualizations and charts');
    addText('• Payout calculation system');
    addText('• Multi-format export (PDF, CSV, Google Sheets)');
    addText('• Toast notifications for user feedback');
    addText('• Mobile-responsive design');

    // File Structure
    addSection('PROJECT FILE STRUCTURE');
    
    addText('src/');
    addText('├── components/');
    addText('│   ├── ui/ (shadcn/ui components)');
    addText('│   ├── Dashboard.tsx');
    addText('│   ├── LoginForm.tsx');
    addText('│   ├── NewsChart.tsx');
    addText('│   ├── PayoutTable.tsx');
    addText('│   ├── ExportOptions.tsx');
    addText('│   ├── Header.tsx');
    addText('│   └── Footer.tsx');
    addText('├── contexts/');
    addText('│   └── AuthContext.tsx');
    addText('├── hooks/');
    addText('│   ├── useNewsAPI.ts');
    addText('│   └── use-toast.ts');
    addText('├── pages/');
    addText('│   ├── Index.tsx');
    addText('│   ├── About.tsx');
    addText('│   ├── Contact.tsx');
    addText('│   ├── Article.tsx');
    addText('│   └── NotFound.tsx');
    addText('└── App.tsx');

    // Development Setup
    addSection('DEVELOPMENT SETUP');
    
    addText('Prerequisites:');
    addText('• Node.js (latest LTS version)');
    addText('• npm or yarn package manager');

    addText('Installation:');
    addText('1. Clone the repository');
    addText('2. Run: npm install');
    addText('3. Run: npm run dev');
    addText('4. Open http://localhost:8080');

    addText('Login Credentials:');
    addText('• Admin access: admin@news.com (any password)');
    addText('• User access: any other email (any password)');

    // Production Considerations
    addSection('PRODUCTION CONSIDERATIONS');
    
    addText('• Replace mock authentication with real auth service');
    addText('• Integrate with actual News API (requires API key)');
    addText('• Implement proper error handling and loading states');
    addText('• Add rate limiting for API calls');
    addText('• Configure environment variables for API keys');
    addText('• Set up CI/CD pipeline for automated deployments');

    // Save the PDF
    doc.save('News-Dashboard-Project-Documentation.pdf');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Project Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Generate a comprehensive PDF document containing all project information, tech stack details, API documentation, and setup instructions.
        </p>
        <Button onClick={generateProjectPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Project Documentation PDF
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectDocumentation;
