import { useLoaderData } from "react-router-dom";

export default function Home() {
  const movies = useLoaderData();
  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
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
              <div>
                <p>Genre: {movie.genre}</p>
                <p>Duration: {movie.duration} Min</p>
                <p>Release Year: {movie.releaseYear}</p>
                <p>Rating: {movie.rating} (Out of 5)</p>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
