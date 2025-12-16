const API = import.meta.env.VITE_API;

export async function getReviewsByUserId(userId, page = 1, token) {
  try {
    const response = await fetch(`${API}/reviews/${userId}/reviews?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with /GET reviews by user id function: ", error);
    return [];
  }
}

export async function getReviewsByHotelId(hotelId, page = 1) {
  try {
    const response = await fetch(`${API}/hotels/${hotelId}/reviews?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with /GET reviews by hotel id function: ", error);
    return [];
  }
}

export async function addReview(hotelId, token, rating, subject, review) {
  try {
    const response = await fetch(`${API}/reviews/${hotelId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, subject, review }),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);
    return result;
  } catch (error) {
    console.error("Error with /POST hotel reviews", error);
    throw error;
  }
}
