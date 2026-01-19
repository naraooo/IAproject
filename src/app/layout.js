// layout.jsx
import './globals.css';
import { Abril_Fatface } from 'next/font/google';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';

const abril = Abril_Fatface({ 
  weight: '400',
  subsets: ['latin']
})
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap"
        />
      </head>
      <body className={abril.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}