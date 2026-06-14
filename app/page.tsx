"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// This safely imports your cloud background component
const CloudBackground = dynamic(() => import('./cloudbackground'), {
  ssr: false,
});

function Hoverable({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-block', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 160ms ease' }}
    >
      {children}
    </div>
  );
}

function HoverGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '18px',
        padding: '12px 20px',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: '999px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(20px)',
        pointerEvents: 'auto',
      }}
    >
      {children}
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#111827',
        fontFamily: 'Inter, system-ui, sans-serif',
        textDecoration: 'none',
        padding: '0 6px',
      }}
    >
      {children}
    </a>
  );
}

export default function Home(): React.JSX.Element {
  const repoUrl = 'https://github.com/Shivam430-stack/Clouds-website';

  return (
    <main style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      {/* Your 3D moving cloud and blue sky */}
      <CloudBackground />

      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          pointerEvents: 'none',
        }}
      >
        <HoverGroup>
          {['Clouds', 'Pricing', 'Menu'].map((item) => (
            <Hoverable key={item}>
              <LinkButton href={repoUrl}>{item}</LinkButton>
            </Hoverable>
          ))}
        </HoverGroup>

        <Hoverable>
          <LinkButton href={repoUrl}>Sign in</LinkButton>
        </Hoverable>
      </div>

      {/* Clean text sitting on top of the cloud */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h3 style={{ fontSize: '6rem', fontWeight: '900', margin: 0, letterSpacing: '0.8rem' }}>
          CLOUDS
        </h3>

        <div style={{ maxWidth: 760, width: '100%', marginTop: 32, padding: '0 12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 12,
              color: '#d1d5db',
              margin: '0 auto 24px',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: 720,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                marginTop: 6,
                borderRadius: '50%',
                backgroundColor: '#9ca3af',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ color: '#e5e7eb', textAlign: 'left' }}>
              Clouds are gently floating formations of tiny water droplets or ice crystals suspended in the sky.
            </span>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.8, margin: '0 auto', maxWidth: 720 }}>
            Clouds bring calm and motion together, showing how weather, light, and air form soft shapes above us. They can be thin wisps, thick puffs, or broad layers, and they move slowly across the blue sky.
          </p>

          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#111827',
              marginTop: 40,
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.185 0 0 1.005-.322 3.3 1.23a11.54 11.54 0 0 1 3.005-.405c1.02.005 2.045.138 3.005.405 2.285-1.552 3.29-1.23 3.29-1.23.655 1.655.245 2.88.12 3.185.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.104.81 2.225 0 1.606-.015 2.9-.015 3.295 0 .325.215.705.825.585C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}