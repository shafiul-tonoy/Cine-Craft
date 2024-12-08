import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { AuthContext } from "../providers/AuthProvider";

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      fetch(`https://cine-craft-server.vercel.app/favorites/${user.email}`)
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

  const handleDeleteFavorite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://cine-craft-server.vercel.app/favorites/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainMovies = favorites.filter((e) => e._id !== id);
              setFavorites(remainMovies);
            }
          });
      }
    });
  };

  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite._id}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Movie Poster */}
            <img
              src={favorite.posterUrl}
              alt={favorite.title}
              className="w-full object-cover rounded-md mb-4 object-top h-96"
            />

            {/* Movie Details */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{favorite.title}</h3>
              <p className="text-gray-600">
                <span className="font-medium">Genre:</span> {favorite.genre}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span>{" "}
                {favorite.duration}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Release Year:</span>{" "}
                {favorite.releaseYear}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Rating:</span> {favorite.rating}{" "}
                (Out of 5)
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteFavorite(favorite._id)}
              className="btn btn-error w-full mt-4"
            >
              Delete Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
