// layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header style={styles.header}>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link href="/">Home</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/committees">Committees</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/about">About</Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={styles.mainContent}>
        {children}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2025 MUN Conference</p>
      </footer>
    </div>
  );
};

const styles: {
  header: React.CSSProperties;
  navList: React.CSSProperties;
  navItem: React.CSSProperties;
  mainContent: React.CSSProperties;
  footer: React.CSSProperties;
} = {
  header: {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: '#fff',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  mainContent: {
    padding: '20px',
    minHeight: '80vh',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center' as const,
    padding: '10px',
    position: 'absolute' as const,
    width: '100%',
    bottom: '0',
  },
};

export default Layout;
