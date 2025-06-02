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

export const addFavItemFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getFavItem");
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
      body: JSON.stringify({ username, email, password }),
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