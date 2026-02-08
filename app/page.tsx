'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import LoadingState from '@/components/LoadingState';

export default function HomePage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('');

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      // Step 1: Upload and parse file
      setStatusText('Uploading...');
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        setError(uploadData.error || 'Failed to upload file');
        setIsUploading(false);
        return;
      }

      // Step 2: Analyze text
      setStatusText('Extracting skills...');
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: uploadData.text }),
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeData.success) {
        setError(analyzeData.error || 'Failed to analyze resume');
        setIsUploading(false);
        return;
      }

      // Step 3: Navigate to results page
      setStatusText('Finding matches...');

      // Store results in sessionStorage for the results page
      sessionStorage.setItem('analysisResults', JSON.stringify({
        skills: analyzeData.skills,
        roles: analyzeData.roles,
      }));

      // Navigate to results
      router.push('/results');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            OpenCareer
          </h1>
          <p className="text-xl text-gray-600">
            Discover career paths based on your skills
          </p>
        </div>

        {/* Main content */}
        {isUploading ? (
          <LoadingState status={statusText} />
        ) : (
          <FileUpload
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}
