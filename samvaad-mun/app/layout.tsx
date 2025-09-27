"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect client + responsive width
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollYRef.current) < 5) return;

      if (currentScrollY > lastScrollYRef.current) setShowHeader(false);
      else setShowHeader(true);

      if (currentScrollY < 50) setShowHeader(true);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden" }}>
      <body style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden" }}>
        <div>
          {/* Header */}
          <header
            style={{
              ...styles.header,
              transform: showHeader ? "translateY(0)" : "translateY(-150%)",
              transition: "transform 0.28s ease-in-out",
              position: "fixed",
              top: 0,
              zIndex: 1000,
            }}
          >
            <nav style={styles.nav}>
              {/* Logo */}
              <div style={styles.logoWrapper}>
                <Link href="/">
                  <Image src="/Samvaad.png" alt="MUN Logo" width={40} height={40} style={{ objectFit: "contain" }} />
                </Link>
              </div>

              {/* Desktop nav */}
              {isClient && !isMobile && (
                <ul style={styles.navList}>
                  <li style={styles.navItem}><Link href="/">Home</Link></li>
                  <li style={styles.navItem}><Link href="/about">About</Link></li>
                  <li style={styles.navItem}><Link href="/committees">Committees</Link></li>
                  <li style={styles.navItem}><Link href="/secretariat">Secretariat</Link></li>
                  <li style={styles.navItem}><Link href="/contact">Contact</Link></li>
                </ul>
              )}

              {/* Mobile right: profile + hamburger */}
              {isClient && isMobile && (
                <div style={styles.rightControls}>
                  <button style={styles.profileBtn}>👤</button>
                  <button
                    onClick={() => setMenuOpen((s) => !s)}
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    style={styles.hamburger}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>☰</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile dropdown (always mounted, toggle class for smooth animation) */}
            {isClient && isMobile && (
              <div
                style={{
                  ...styles.mobileMenuOverlay,
                  maxHeight: menuOpen ? "500px" : "0",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                  transition: "max-height 0.4s ease, opacity 0.3s ease, transform 0.6s ease",
                  overflow: "hidden",
                }}
              >
                <ul style={styles.mobileMenu}>
                  {["Home", "About", "Committees", "Secretariat", "Contact"].map((label, index) => {
                    const href = label === "Home" ? "/" : `/${label.toLowerCase()}`;
                    return (
                      <li
                        key={label}
                        style={{
                          ...styles.mobileItem,
                          transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`,
                          opacity: menuOpen ? 1 : 0,
                          transform: menuOpen ? "translateY(0)" : "translateY(-5px)",
                        }}
                      >
                        <Link href={href} onClick={() => setMenuOpen(false)}>
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </header>

          {/* Content */}
          <div style={{ paddingTop: 70 }}>
            <main style={styles.mainContent}>{children}</main>
          </div>

          <footer style={styles.footer}>
            <p>&copy; 2025 MUN Conference</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  header: { backgroundColor: "#fff", padding: "10px 20px", color: "#000", width: "100%" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  navList: { listStyle: "none", display: "flex", justifyContent: "space-around", margin: 0, padding: 0, width: "100%" },
  navItem: { margin: "0 10px" },
  mobileNavBar: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" },
  logoWrapper: { display: "flex", alignItems: "center" },
  rightControls: { display: "flex", alignItems: "center", gap: "12px" },
  profileBtn: { fontSize: "18px", background: "none", border: "none", cursor: "pointer", padding: "6px" },
  hamburger: { fontSize: "22px", background: "none", border: "none", cursor: "pointer", padding: "6px" },
  mobileMenuOverlay: { width: "100%", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" },
  mobileMenu: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: "10px" },
  mobileItem: { padding: "8px 0" },
  mainContent: { padding: 0, margin: 0, width: "100%", minHeight: "80vh" },
  footer: { backgroundColor: "#333", color: "#fff", textAlign: "center" as const, padding: "10px", position: "relative" as const, width: "100%" },
};
