import "./globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
