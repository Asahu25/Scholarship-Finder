import React, { useEffect, useState } from 'react';
import '../Styles/ScholarshipIndex.css';
import { addItemFromServer } from "../services/scholarItemServices";

const ScholarshipHome = ({ addToFavourites, removeFromFavourites, favouriteList = [] }) => {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    const fetchScholarships = async () => {
        try {
            const data = await addItemFromServer(); 
            console.log("Scholarships Data:", data); 
            setScholarships(data); // Set the fetched data to state
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        }
    };

    fetchScholarships();
  }, []);

  const isFavourite = (id) => favouriteList.some((sch) => sch.id === id);

  const handleFavouriteClick = (scholarship) => {
    if (isFavourite(scholarship.id)) {
      removeFromFavourites(scholarship.id);
    } else {
      addToFavourites(scholarship);
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
            <p>No scholarships available. Please try again later.</p> // Fallback UI
          ) : (
            scholarships.map((scholarship) => {
              const fav = isFavourite(scholarship.id);

              return (
                <article key={scholarship.id} className="scholarship-card">
                  <h3>{scholarship.ScholarTitle}</h3>
                  <p className="amount">Up to {scholarship.Amount}</p>
                  <p className="deadline">Deadline: {scholarship.Deadline}</p>
                  <div className="card-buttons">
                    <button>View Details</button>
                    <button
                      onClick={() => handleFavouriteClick(scholarship)}
                      className={`fav-button ${fav ? 'added' : ''}`}
                    >
                      {fav ? 'Remove from Favourites' : 'Add to Favourites'}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default ScholarshipHome;
