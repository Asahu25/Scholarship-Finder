import React, { useEffect, useState } from 'react';
import '../Styles/ScholarshipIndex.css'; // Optional: reuse styles if needed
import { addFavItemFromServer } from "../services/scholarItemServices";

const Favourites = ({ removeFromFavourites }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await addFavItemFromServer();
        console.log("Favourites Data:", data);
        setFavourites(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

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
                  <button onClick={() => removeFromFavourites(scholarship.id)}>Remove</button>
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
