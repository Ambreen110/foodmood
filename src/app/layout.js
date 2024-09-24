// app/layout.js
import './styles/globals.css';  // Import global styles
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Food Mood App',
  description: 'App to display meals based on mood and weekdays',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main content (children will be rendered here) */}
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
