import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/context/AuthProvider';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anonymous message',
  description: 'Send and receive message anonymously',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={sora.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
