import Header from './Components/Header';
import Footer from './Components/Footer';
import "./globals.css";
export const metadata = {
  title: "Ecommerce App Powered by nextJS and Tailwind",
  description: "We are using app router for this website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
