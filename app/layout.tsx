import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'صفحة الدفع - معاك',
  description: 'إتمام عملية الشراء',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Zain:wght@200;300;400;700;800;900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="font-zain bg-gray-50">{children}</body>
    </html>
  );
}