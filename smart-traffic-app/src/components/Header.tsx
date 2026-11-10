import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, onOpenReportModal }) => {
  const { currentUser, setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Beranda' },
    { key: 'map', label: 'Peta Lalu Lintas' },
    { key: 'cctv', label: 'CCTV & IoT' },
    { key: 'routes', label: 'Rute Rekomendasi' },
    ...(currentUser.role !== 'public'
      ? [{ key: 'dashboard', label: 'Dashboard Operasional' }]
      : []),
    { key: 'about', label: 'Tentang Kami' }
  ];

  const handleNavClick = (key: string) => {
    setCurrentTab(key);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-sticky)'
      }}
    >
      {/* Top Banner / Role Switcher for Testing & Demonstration */}
      <div
        style={{
          backgroundColor: '#002B49',
          color: '#e2e8f0',
          padding: '0.4rem 1.5rem',
          fontSize: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="live-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>SISTEM KENDALI LALU LINTAS CERDAS (ITS) PROVINSI LAMPUNG &bull; REAL-TIME</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#94a3b8' }}>Mode Simulasi Role:</span>
          {(['public', 'operator', 'admin', 'pimpinan'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                background: currentUser.role === r ? '#00726E' : 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: currentUser.role === r ? '1px solid #5eead4' : '1px solid transparent',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontWeight: currentUser.role === r ? 700 : 500,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.15s ease'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand & Dual Logos */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img
              src="/LOGO PEMDA.png"
              alt="Logo Pemprov Lampung"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ width: '1px', height: '34px', backgroundColor: '#cbd5e1' }} />
            <img
              src="/LOGO TEKNO.png"
              alt="Logo Universitas Teknokrat Indonesia"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                SMART TRAFFIC
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--primary-fixed)',
                  color: 'var(--primary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}
              >
                PROV. LAMPUNG
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Pusat Informasi &amp; Manajemen Lalu Lintas Terpadu
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="nav-tabs-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {navItems.map(item => {
            const isActive = currentTab === item.key;
            const isDashboard = item.key === 'dashboard';
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                style={{
                  padding: '0.5rem 0.85rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive
                    ? (isDashboard ? '#005854' : 'var(--primary-fixed)')
                    : (isDashboard ? '#e0f2fe' : 'transparent'),
                  color: isActive
                    ? (isDashboard ? '#fff' : 'var(--primary)')
                    : (isDashboard ? '#0369a1' : 'var(--text-main)'),
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Account Profile & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onOpenReportModal}
            className="btn btn-teal btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>campaign</span>
            <span>Lapor Kejadian</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.65rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.name}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'capitalize' }}>
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn btn btn-secondary btn-sm"
            style={{ padding: '0.35rem', display: 'none' }}
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        >
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              style={{
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: currentTab === item.key ? 'var(--primary-fixed)' : 'transparent',
                color: currentTab === item.key ? 'var(--primary)' : 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
