import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
        TEAM NOVA
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
        Welcome to the NOVA Team Management Portal
      </p>
      
      <div className="glass-card" style={{ display: 'inline-block', padding: '3rem', borderRadius: '24px' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>Manage Team</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigate('/add')}>
            Add Member
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/view')}>
            View Members
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
