import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface MoviePDFSectionProps {
  pdfUrl: string;
}

const MoviePDFSection: React.FC<MoviePDFSectionProps> = ({ pdfUrl }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Download Movie PDF</h2>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2" variant="outline">
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default MoviePDFSection;