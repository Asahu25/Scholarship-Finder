import React from 'react';
import '../Styles/ScholarshipIndex.css';

const ScholarshipHome = () => {
  return (
    <div className="scholarship-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Scholarships to Help Pay for College</h1>
          <p>Search from over X scholarships worth more than Y ruppees.</p>
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
              <option>₹10,00+</option>
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
          <div className="filter-group">
            <label>Type</label>
            <select>
              <option>All Types</option>
              <option>Merit-based</option>
              <option>Need-based</option>
              <option>Career-specific</option>
            </select>
          </div>
        </aside>

        <section className="results-list">
          {[...Array(20).keys()].map((id) => (
            <article key={id} className="scholarship-card">
              <h3>Scholarship Title {id}</h3>
              <p className="amount">Up to ₹10,000</p>
              <p className="deadline">Deadline: June 30, 2025</p>
              <div className="card-buttons">
                <button>View Details</button>
                <button>favourites</button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ScholarshipHome;
