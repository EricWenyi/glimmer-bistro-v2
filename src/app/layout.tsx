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
      <body>
        <Dots />
        <Sidebar />
        <div className="lg:ml-[250px] relative z-[1]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
