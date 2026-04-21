import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    project: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: '',
    achievements: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) {
      data.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/view');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>Add Team Member</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" required onChange={handleInputChange} />
        </div>
        
        <div className="form-group">
          <label className="form-label">Roll Number</label>
          <input type="text" name="rollNumber" className="form-control" required onChange={handleInputChange} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input type="text" name="year" className="form-control" required onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Degree</label>
            <input type="text" name="degree" className="form-control" required onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">About Project</label>
          <textarea name="project" className="form-control" rows="3" required onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Hobbies (comma separated)</label>
          <input type="text" name="hobbies" className="form-control" required onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Certificate</label>
          <input type="text" name="certificate" className="form-control" required onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Internship</label>
          <input type="text" name="internship" className="form-control" required onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">About Your Aim</label>
          <textarea name="aboutYourAim" className="form-control" rows="3" required onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">List of Achievements</label>
          <textarea name="achievements" className="form-control" rows="3" placeholder="e.g. Hackathon Winner, Published Paper..." onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Profile Image</label>
          <input type="file" accept="image/*" className="form-control" style={{ padding: '0.5rem' }} required onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}

export default AddMember;
