const API = import.meta.env.VITE_API;

export async function getUserInfo(token) {
  try {
    const response = await fetch(`${API}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with /GET user info function: ", error);
    return null;
  }
}

export async function addUserProfilePic(token, profilePic) {
  try {
    const response = await fetch(`${API}/users/pic`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profilePic),
    });
    if (response.ok) return await response.json(); 
    const text = await response.text(); 
    throw new Error(text);
  } catch (error) {
    console.error("Error with /PATCH profilePic", error);
    throw error;
  }
}
