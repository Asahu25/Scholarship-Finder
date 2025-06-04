import React, { useEffect, useState } from 'react';
import '../Styles/ScholarshipIndex.css';
import { addItemFromServer, addToFavorites } from "../services/scholarItemServices";
import { useNavigate } from 'react-router-dom';

const ScholarshipHome = () => {
  const [scholarships, setScholarships] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await addItemFromServer(); 
        console.log("Scholarships Data:", data); 
        setScholarships(data); 
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  const handleAddToFavorites = async (scholarship) => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    try {
      await addToFavorites(scholarship, userEmail);
      setFavorites(prev => new Set([...prev, scholarship.id]));
      alert('Added to favorites successfully!');
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert('Failed to add to favorites. Please try again.');
    }
  };

  return (
    <div className="scholarship-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Scholarships to Help Pay for College</h1>
          <p>Search from over X scholarships worth more than Y rupees.</p>
          <form className="search-form">
            <input
              type="text"
              placeholder="Enter keywords, school name, or fields of study"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <aside className="filters-sidebar">
          <h2>Filter by</h2>
          <div className="filter-group">
            <label>Amount</label>
            <select>
              <option>Any</option>
              <option>₹10,000+</option>
              <option>₹50,000+</option>
              <option>₹1,00,000+</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Deadline</label>
            <select>
              <option>Anytime</option>
              <option>Next 30 days</option>
              <option>Next 60 days</option>
              <option>Next 90 days</option>
            </select>
          </div>
        </aside>

        <section className="results-list">
          {scholarships.length === 0 ? (
            <p style={{ padding: '1rem' }}>Loading scholarships...</p>
          ) : (
            scholarships.map((scholarship) => (
              <article key={scholarship.id} className="scholarship-card">
                <h3>{scholarship.ScholarTitle}</h3>
                <p className="amount">Up to {scholarship.Amount}</p>
                <p className="deadline">Deadline: {scholarship.Deadline}</p>
                <div className="card-buttons">
                  <button 
                    onClick={() => handleAddToFavorites(scholarship)}
                    disabled={favorites.has(scholarship.id)}
                    className={favorites.has(scholarship.id) ? 'added' : ''}
                  >
                    {favorites.has(scholarship.id) ? 'Added to Favorites' : 'Add to Favorites'}
                  </button>
                  <a href={scholarship.ScholarUrl} target="_blank" rel="noopener noreferrer" className="apply-button">
                    Apply Now
                  </a>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default ScholarshipHome;
