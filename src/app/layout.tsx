import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Dots from '@/components/Dots';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Glimmer Bistro',
  description: 'A home kitchen with heart — Italian-inspired dining experiences in San Diego.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sacramento&family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Dots />
        <Sidebar />
        <div className="main-content">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
