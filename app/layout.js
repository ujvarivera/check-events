import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CheckEvents",
  description: "Check the Events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="light" accentColor="blue">
          <NavBar />
          <main>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
