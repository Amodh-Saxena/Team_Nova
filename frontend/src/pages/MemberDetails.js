import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${id}`);
        navigate('/view');
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Failed to remove member.');
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading details...</div>;
  if (!member) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Member not found.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button className="btn btn-outline" style={{ marginBottom: '2rem' }} onClick={() => navigate('/view')}>
        ← Back to Members
      </button>

      <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '4px solid var(--primary)',
          boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)'
        }}>
          <img 
            src={`http://localhost:5000/${member.image}`} 
            alt={member.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{member.name}</h2>
        <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '2rem' }}>
          {member.degree} - {member.year}
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <DetailRow label="Roll Number" value={member.rollNumber} />
          <DetailRow label="Project" value={member.project} />
          <DetailRow label="Hobbies" value={member.hobbies} />
          <DetailRow label="Certificate" value={member.certificate} />
          <DetailRow label="Internship" value={member.internship} />
          <DetailRow label="About Your Aim" value={member.aboutYourAim} />
          {member.achievements && (
            <DetailRow label="Achievements" value={member.achievements} />
          )}
        </div>
        
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '2rem', backgroundColor: '#ef4444', borderColor: '#ef4444' }} 
          onClick={handleDelete}
        >
          Remove Member
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}:</div>
      <div style={{ color: 'var(--text-main)' }}>{value}</div>
    </div>
  );
}

export default MemberDetails;
