import React, { useEffect, useState } from 'react';
import '../Styles/ScholarshipIndex.css'; 
import { addFavItemFromServer, removeFromFavorites } from "../services/scholarItemServices";
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      const userEmail = sessionStorage.getItem('userEmail');
      if (!userEmail) {
        navigate('/login');
        return;
      }

      try {
        const data = await addFavItemFromServer(userEmail);
        console.log("Favourites Data:", data);
        setFavourites(data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [navigate]);

  const handleRemoveFromFavorites = async (scholarshipId) => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    try {
      await removeFromFavorites(scholarshipId, userEmail);
      setFavourites(prev => prev.filter(item => item.id !== scholarshipId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="scholarship-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Favourites</h1>
          <p>Here are the scholarships you've saved.</p>
        </div>
      </header>

      <main className="main-content">
        <section className="results-list">
          {favourites.length === 0 ? (
            <p style={{ padding: '1rem' }}>No scholarships in favourites yet.</p>
          ) : (
            favourites.map((scholarship) => (
              <article key={scholarship.id} className="scholarship-card">
                <h3>{scholarship.ScholarTitle}</h3>
                <p className="amount">Up to {scholarship.Amount}</p>
                <p className="deadline">Deadline: {scholarship.Deadline}</p>
                <div className="card-buttons">
                  <button onClick={() => handleRemoveFromFavorites(scholarship.id)}>Remove</button>
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

export default Favourites;
