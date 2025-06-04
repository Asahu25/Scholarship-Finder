export const addItemFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getItem");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const items = await response.json();
    console.log("Fetched Items from Server:", items); // Log the fetched data
    if (!Array.isArray(items)) {
      console.error("Expected an array but got:", items); // Log unexpected data structure
      return [];
    }
    return items.map(scholarItemsToClient);
  } catch (error) {
    console.error("Error fetching items from server:", error);
    return [];
  }
};

export const addFavItemFromServer = async (email) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getFavItem/${email}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const items = await response.json();
    console.log("Fetched Favorites for email:", email, items);
    if (!Array.isArray(items)) {
      console.error("Expected an array but got:", items);
      return [];
    }
    return items.map(scholarItemsToClient);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const addToFavorites = async (scholarship, email) => {
  try {
    const response = await fetch("http://localhost:3000/api/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ScholarTitle: scholarship.ScholarTitle,
        Amount: scholarship.Amount,
        Deadline: scholarship.Deadline,
        ScholarUrl: scholarship.ScholarUrl,
        email: email
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Added to favorites:", data);
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
  return {
    id: serverItem._id,
    ScholarTitle: serverItem.ScholarTitle,
    Amount: serverItem.Amount,
    Deadline: serverItem.Deadline,
    ScholarUrl: serverItem.ScholarUrl,
  };
};

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Sign up response:", data);
    return data;
  } catch (error) {
    return error;
  }
};  

export const getUser = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("User response:", data);
    return data;
  } catch (error) {
    return error;
  }
};  