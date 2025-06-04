export const addItemFromServer = async (page = 1, limit = 10) => {
  try {
    console.log(`Fetching scholarships from server (page ${page})...`);
    const response = await fetch(`http://localhost:3000/api/getItem?page=${page}&limit=${limit}`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Fetched scholarship data:", data);
    
    if (!data.items || !Array.isArray(data.items)) {
      console.error("Expected items array but got:", typeof data.items, data);
      return {
        items: [],
        currentPage: 1,
        totalPages: 0,
        totalItems: 0
      };
    }
    
    return {
      items: data.items.map(scholarItemsToClient).filter(item => item !== null),
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalItems: data.totalItems
    };
  } catch (error) {
    console.error("Error fetching items from server:", error);
    throw error;
  }
};

export const addFavItemFromServer = async (email) => {
  try {
    console.log("Fetching favorites for email:", email);
    const response = await fetch(`http://localhost:3000/api/getFavItem/${email}`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const items = await response.json();
    console.log("Fetched Favorites:", items);
    
    if (!Array.isArray(items)) {
      console.error("Expected an array but got:", typeof items, items);
      return [];
    }
    
    return items.map(scholarItemsToClient);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addToFavorites = async (scholarship, email) => {
  try {
    console.log("Adding to favorites:", { scholarship, email });
    const response = await fetch("http://localhost:3000/api/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        ScholarTitle: scholarship.ScholarTitle,
        Amount: scholarship.Amount,
        Deadline: scholarship.Deadline,
        ScholarUrl: scholarship.ScholarUrl,
        email: email
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to add to favorites");
    }
    
    console.log("Successfully added to favorites:", data);
    return data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (scholarshipId, email) => {
  try {
    const response = await fetch(`http://localhost:3000/api/removeFavorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        scholarshipId,
        email
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Removed from favorites:", data);
    return data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const scholarItemsToClient = (serverItem) => {
  if (!serverItem || typeof serverItem !== 'object') {
    console.error("Invalid server item:", serverItem);
    return null;
  }

  return {
    id: serverItem._id || '',
    ScholarTitle: serverItem.ScholarTitle || '',
    Amount: serverItem.Amount || '',
    Deadline: serverItem.Deadline || '',
    ScholarUrl: serverItem.ScholarUrl || '',
  };
};

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, username, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Sign up failed");
    }
    
    return data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};  

export const getUser = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};  

export const logout = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }
    
    sessionStorage.clear();
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    sessionStorage.clear();
    throw error;
  }
};  

export const checkIfFavorited = async (scholarshipId, email) => {
  try {
    const response = await fetch(`http://localhost:3000/api/checkFavorite/${email}/${scholarshipId}`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to check favorite status');
    }
    
    const data = await response.json();
    return data.isFavorited;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};  