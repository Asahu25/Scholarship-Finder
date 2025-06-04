import React, { useEffect, useState, useCallback } from 'react';
import '../Styles/ScholarshipIndex.css';
import { addItemFromServer, addToFavorites, checkIfFavorited, addFavItemFromServer } from "../services/scholarItemServices";
import { useNavigate } from 'react-router-dom';

const ScholarshipHome = () => {
  const [scholarships, setScholarships] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Initialize favorites from server
  useEffect(() => {
    const initializeFavorites = async () => {
      const userEmail = sessionStorage.getItem('userEmail');
      if (userEmail) {
        try {
          const favItems = await addFavItemFromServer(userEmail);
          const favSet = new Set(favItems.map(item => item.id));
          setFavorites(favSet);
        } catch (err) {
          console.error("Error initializing favorites:", err);
        }
      }
    };

    initializeFavorites();
  }, []);

  const checkFavoriteStatus = async (scholarships, userEmail) => {
    const favoritesSet = new Set();
    await Promise.all(
      scholarships.map(async (scholarship) => {
        try {
          if (scholarship.id) {
            const isFavorited = await checkIfFavorited(scholarship.id, userEmail);
            if (isFavorited) {
              favoritesSet.add(scholarship.id);
            }
          }
        } catch (err) {
          console.error(`Error checking favorite status for scholarship ${scholarship.id}:`, err);
        }
      })
    );
    return favoritesSet;
  };

  const fetchScholarships = useCallback(async (page, search = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await addItemFromServer(page, 10, search);
      
      setScholarships(data.items);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);

      // Check favorite status for each scholarship
      const userEmail = sessionStorage.getItem('userEmail');
      if (userEmail && data.items.length > 0) {
        const favoritesSet = await checkFavoriteStatus(data.items, userEmail);
        setFavorites(prev => new Set([...prev, ...favoritesSet]));
      }
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      setError(error.message || "Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarships(1, searchQuery);
  }, [fetchScholarships, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchScholarships(newPage, searchQuery);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchScholarships(1, searchQuery);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToFavorites = async (scholarship) => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    // Check if already in favorites
    if (favorites.has(scholarship.id)) {
      return; // Already in favorites, do nothing
    }

    try {
      await addToFavorites(scholarship, userEmail);
      setFavorites(prev => new Set([...prev, scholarship.id]));
    } catch (error) {
      if (error.message.includes('already in favorites')) {
        // Update local state to reflect the server state
        setFavorites(prev => new Set([...prev, scholarship.id]));
      } else {
        console.error("Error adding to favorites:", error);
        alert('Failed to add to favorites. Please try again.');
      }
    }
  };

  if (error) {
    return (
      <div className="scholarship-container">
        <div className="error-message" style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          {error}
          <button 
            onClick={() => fetchScholarships(currentPage, searchQuery)} 
            style={{ display: 'block', margin: '1rem auto' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scholarship-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Scholarships to Help Pay for College</h1>
          <p>Search from our curated list of available scholarships.</p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search scholarships by name..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <section className="results-list">
          {loading ? (
            <p style={{ padding: '1rem' }}>Loading scholarships...</p>
          ) : scholarships.length === 0 ? (
            <p style={{ padding: '1rem' }}>No scholarships found.</p>
          ) : (
            <>
              <div className="scholarships-grid">
                {scholarships.map((scholarship) => (
                  <article key={scholarship.id} className="scholarship-card">
                    <h3>{scholarship.ScholarTitle}</h3>
                    <p className="amount">Amount: {scholarship.Amount}</p>
                    <p className="deadline">Deadline: {scholarship.Deadline}</p>
                    <div className="card-buttons">
                      <button 
                        onClick={() => handleAddToFavorites(scholarship)}
                        disabled={favorites.has(scholarship.id)}
                        className={favorites.has(scholarship.id) ? 'added' : ''}
                      >
                        {favorites.has(scholarship.id) ? 'Added to Favorites' : 'Add to Favorites'}
                      </button>
                      {scholarship.ScholarUrl && (
                        <a 
                          href={scholarship.ScholarUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="apply-button"
                        >
                          Apply Now
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination-container">
                  <div className="pagination">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ScholarshipHome;
