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

export default function Home(): React.JSX.Element {
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
          {['Cloud', 'Menu', 'Pricing'].map((item) => (
            <Hoverable key={item}>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#111827',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {item}
              </span>
            </Hoverable>
          ))}
        </HoverGroup>

        <Hoverable>
          <div
            style={{
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '999px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#111827',
              fontFamily: 'Inter, system-ui, sans-serif',
              pointerEvents: 'auto',
              display: 'inline-block',
            }}
          >
            Sign in
          </div>
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
          textAlign: 'center'
        }}
      >
        <h3 style={{ fontSize: '6rem', fontWeight: '900', margin: 0, letterSpacing: '0.8rem' }}>
          CLOUDS
        </h3>
      </div>
    </main>
  );
}