import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/favorites/${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch favorites");
          }
          return response.json();
        })
        .then((data) => {
          setFavorites(data); // Store fetched data
          setLoading(false); // Stop the loading spinner
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false); // Stop the loading spinner
        });
    }
  }, [user?.email]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>; // Display an error message
  }
  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
    {favorites.map((favorite) => (
      <div key={favorite._id} className="mb-4">
        <img src={favorite.posterUrl} alt={favorite.title} className="w-24 h-24 object-cover object-top rounded-full" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{favorite.title}</h3>
          <p>Genre: {favorite.genre}</p>
          <p>Duration: {favorite.duration}</p>
          <p>Release Year: {favorite.releaseYear}</p>
          <p>Rating: {favorite.rating} (Out of 5)</p>
        </div>
      </div>
    ))}
    </div>
  );
}
