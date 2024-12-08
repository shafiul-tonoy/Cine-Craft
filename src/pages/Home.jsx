import { useLoaderData, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";

export default function Home() {
  const movies = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
      <Banner />
      <h1 className="text-xl my-8 font-bold">Featured Movies</h1>
      {/* movie grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {movies.map((movie) => (
          <div key={movie._id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={movie.posterUrl}
                alt="movie"
                className="rounded-xl h-96 object-cover object-top"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{movie.title}</h2>
              <div className="text-left space-y-2">
                <p> Genre: {movie.genre}</p>
                <p> Duration: {movie.duration} Min</p>
                <p> Release Year: {movie.releaseYear}</p>
                <p> Rating: {movie.rating} (Out of 5)</p>
              </div>
              <div className="card-actions mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/details/${movie._id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* grid end */}
      <button
        type="button"
        className="btn btn-info my-6 mx-2 "
        onClick={() => navigate("/allMovies")}
      >
        All Movies
      </button>
      {/* review section */}
      <div className="p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Latest Movie Reviews
        </h2>
        <div className="space-y-4">
          {/* Review Item */}
          <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">The Final Adventure</h3>
            <p className="text-sm text-gray-600 italic">
              "A breathtaking journey with jaw-dropping visuals!" -{" "}
              <span className="font-medium">Tomy Cruze</span>
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="badge badge-success">4.8/5</span>
              <span className="text-xs text-gray-500">
                Reviewed on Dec 5, 2024
              </span>
            </div>
          </div>

          {/* Review Item */}
          <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">Comedy Craze</h3>
            <p className="text-sm text-gray-600 italic">
              "Non-stop laughs from start to finish!" -{" "}
              <span className="font-medium">Mr. Hassan</span>
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="badge badge-warning">4.3/5</span>
              <span className="text-xs text-gray-500">
                Reviewed on Dec 3, 2024
              </span>
            </div>
          </div>

          {/* Review Item */}
          <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">Sci-Fi Spectacle</h3>
            <p className="text-sm text-gray-600 italic">
              "A mind-bending story with incredible acting." -{" "}
              <span className="font-medium">Leonardo De Caprio</span>
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="badge badge-primary">4.5/5</span>
              <span className="text-xs text-gray-500">
                Reviewed on Dec 1, 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* date section */}
      <div className="p-6 bg-gray-300 rounded-md shadow-md my-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Upcoming Movie Release Dates
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-left">Movie Title</th>
                <th className="text-left">Release Date</th>
                <th className="text-left">Director</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td>How to Train Your Dragon</td>
                <td>Jan 15, 2025</td>
                <td>Dean Deblois</td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td>Elio</td>
                <td>Feb 10, 2025</td>
                <td>Adrian Molina</td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td>Jurassic World: Rebirth</td>
                <td>Mar 5, 2025</td>
                <td>Gareth Edwards</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
