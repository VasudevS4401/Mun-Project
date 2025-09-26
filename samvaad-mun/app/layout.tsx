"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Scroll hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onNavClick = () => setMenuOpen(false);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div>
          {/* Header */}
          <header
            style={{
              ...styles.header,
              transform: showHeader ? "translateY(0)" : "translateY(-150%)",
              transition: "transform 0.28s ease-in-out",
              position: "sticky",
              top: "0",
              zIndex: 1000,
            }}
          >
            <nav style={styles.nav}>
              {/* --- DESKTOP NAV --- */}
              {!isMobile && (
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
              )}

              {/* --- MOBILE NAV --- */}
              {isMobile && (
                <div style={styles.mobileNavBar}>
                  {/* Left logo */}
                  <div style={styles.logoWrapper}>
                    <Image
                      src="/Samvaad.png"
                      alt="MUN Logo"
                      width={40}
                      height={40}
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* Right side controls */}
                  <div style={styles.rightControls}>
                    {/* User profile */}
                    <button style={styles.profileBtn}>👤</button>

                    {/* Hamburger */}
                    <button
                      onClick={() => setMenuOpen((s) => !s)}
                      aria-expanded={menuOpen}
                      aria-label={menuOpen ? "Close menu" : "Open menu"}
                      style={styles.hamburger}
                    >
                      <span style={{ fontSize: 22, lineHeight: 1 }}>☰</span>
                    </button>
                  </div>
                </div>
              )}
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMobile && menuOpen && (
              <div style={styles.mobileMenuOverlay}>
                <ul style={styles.mobileMenu}>
                  <li style={styles.mobileItem}>
                    <Link href="/" onClick={onNavClick}>
                      Home
                    </Link>
                  </li>
                  <li style={styles.mobileItem}>
                    <Link href="/about" onClick={onNavClick}>
                      About
                    </Link>
                  </li>
                  <li style={styles.mobileItem}>
                    <Link href="/committees" onClick={onNavClick}>
                      Committees
                    </Link>
                  </li>
                  <li style={styles.mobileItem}>
                    <Link href="/secretariat" onClick={onNavClick}>
                      Secretariat
                    </Link>
                  </li>
                  <li style={styles.mobileItem}>
                    <Link href="/contact" onClick={onNavClick}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            )}
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
  nav: React.CSSProperties;
  navList: React.CSSProperties;
  navItem: React.CSSProperties;
  mobileNavBar: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  rightControls: React.CSSProperties;
  profileBtn: React.CSSProperties;
  hamburger: React.CSSProperties;
  mobileMenuOverlay: React.CSSProperties;
  mobileMenu: React.CSSProperties;
  mobileItem: React.CSSProperties;
  mainContent: React.CSSProperties;
  footer: React.CSSProperties;
} = {
  header: {
    backgroundColor: "#fff",
    padding: "10px 20px",
    color: "#000",
    width: "100%",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  navItem: {
    margin: "0 10px",
  },
  mobileNavBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
  },
  rightControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  profileBtn: {
    fontSize: "18px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
  },
  hamburger: {
    fontSize: "22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
  },
  mobileMenuOverlay: {
    width: "100%",
    background: "#fff",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    padding: "16px",
  },
  mobileMenu: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  mobileItem: {
    padding: "8px 0",
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
  },
};
