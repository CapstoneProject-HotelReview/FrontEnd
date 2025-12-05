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
