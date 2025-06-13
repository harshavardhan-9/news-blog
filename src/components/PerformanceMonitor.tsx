import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface Score {
  score: number;
  title: string;
  description: string;
}

interface PerformanceMetrics {
  performance: Score;
  accessibility: Score;
  seo: Score;
  bestPractices: Score;
}

const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Poor';
};

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
    performance: {
      score: 95,
      title: 'Performance',
      description: 'Page load and interaction speed',
    },
    accessibility: {
      score: 98,
      title: 'Accessibility',
      description: 'WCAG compliance and usability',
    },
    seo: {
      score: 100,
      title: 'SEO',
      description: 'Search engine optimization',
    },
    bestPractices: {
      score: 92,
      title: 'Best Practices',
      description: 'Modern web development standards',
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(metrics).map(([key, metric]) => (
        <Card key={key} className="p-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">{metric.title}</h3>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
            <div className="mt-2">
              <Progress
                value={metric.score}
                className={`h-2 ${getScoreColor(metric.score)}`}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium">{metric.score}%</span>
              <span className="text-sm text-muted-foreground">
                {getScoreLabel(metric.score)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}; 