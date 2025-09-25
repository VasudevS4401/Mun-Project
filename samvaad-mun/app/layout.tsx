"use client"; // ✅ Required for React hooks in layout

import "./globals.css";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // scrolling down → hide
      } else {
        setShowHeader(true); // scrolling up → show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div>
          {/* Header */}
          <header
            style={{
              ...styles.header,
              transform: showHeader ? "translateY(0)" : "translateY(-150%)",
              transition: "transform 0.3s ease-in-out",
              position: "sticky",
              top: "20px",
              zIndex: 1000,
            }}
          >
            <nav>
              <ul style={styles.navList}>
                <li style={styles.navItem}>
                  <Link href="/">Home</Link>
                </li>
                <li style={styles.navItem}>
                  <Link href="/about">About</Link>
                </li>                
                <li style={styles.navItem}>
                  <Link href="/committees">Committees</Link>
                </li>
                <li style={styles.navItem}>
                  <Link href="/secretariat">Secretariat</Link>
                </li>
                <li style={styles.navItem}>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </header>

          {/* Main content */}
          <main style={styles.mainContent}>{children}</main>

          {/* Footer */}
          <footer style={styles.footer}>
            <p>&copy; 2025 MUN Conference</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

const styles: {
  header: React.CSSProperties;
  navList: React.CSSProperties;
  navItem: React.CSSProperties;
  mainContent: React.CSSProperties;
  footer: React.CSSProperties;
} = {
  header: {
    backgroundColor: "#fff",
    padding: "10px 20px",
    color: "#000",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  mainContent: {
    padding: "20px",
    minHeight: "80vh",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    position: "relative",
    width: "100%",
    bottom: 0,
  },
};
