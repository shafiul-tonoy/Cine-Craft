import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function AllMovies() {
  const data = useLoaderData();
  const [search, setSearch] = useState("");

  // Filter movies based on the search term
  const filteredMovies = data.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Movie Collection
      </h1>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
              >
                <div className="flex justify-between">
                  {/* Movie Poster */}
                  <figure className="w-2/4">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </figure>
                  {/* Movie Details */}
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg font-semibold">
                      {movie.title}
                    </h2>
                    <p>
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p>
                      <strong>Duration:</strong> {movie.duration}
                    </p>
                    <p>
                      <strong>Release Year:</strong> {movie.releaseYear}
                    </p>
                    <p>
                      <strong>Rating:</strong> {movie.rating} (Out of 5)
                    </p>
                    <div className="card-actions mt-4 mx-auto">
                      <button className="btn btn-primary">See Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No movies found for "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
