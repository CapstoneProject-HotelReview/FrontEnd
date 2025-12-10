const API = import.meta.env.VITE_API;

export async function getReviews(userId, page = 1, token) {
  try {
    const response = await fetch(
      `${API}/reviews/${userId}/reviews?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error(response.statusText);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with /GET reviews function: ", error);
    return [];
  }
}

export async function addReview() {}
