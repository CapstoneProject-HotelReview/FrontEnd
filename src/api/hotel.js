const API = import.meta.env.VITE_API;

export async function getHotelById(hotelId, token) {
  try {
    const response = await fetch(`${API}/hotels/${hotelId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const hotel = await response.json();
    return hotel;
  } catch (error) {
    console.error("Error fetching hotel: ", error);
    return null;
  }
}
