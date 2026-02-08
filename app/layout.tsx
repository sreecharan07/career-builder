import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OpenCareer - Discover Career Paths',
  description: 'Upload your resume and discover career paths based on your skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
