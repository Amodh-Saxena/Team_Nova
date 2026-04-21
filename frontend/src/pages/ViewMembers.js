import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members?t=${Date.now()}`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading members...</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-main)' }}>MEET OUR AMAZING TEAM</h2>
      
      {members.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No team members found.</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {members.map(member => (
            <div key={member._id} className="glass-card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 1.5rem',
                border: '4px solid var(--primary)',
                background: '#fff'
              }}>
                <img 
                  src={`http://localhost:5000/${member.image}`} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                />
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{member.name.toLowerCase()}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                Roll Number: {member.rollNumber}
              </p>
              
              <div style={{ marginTop: 'auto' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => navigate(`/member/${member._id}`)}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
