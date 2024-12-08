import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

export default function Details() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    _id,
    title,
    posterUrl,
    genre,
    duration,
    releaseYear,
    summary,
    rating,
  } = useLoaderData();

  const handleDelete = (_id) => {
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
        fetch(`http://localhost:5000/movies/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              navigate("/allMovies");
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleFavorite = () => {
    const data = {
      userEmail: user.email,
      title,
      posterUrl,
      genre,
      duration,
      releaseYear,
      summary,
      rating,
    };
    fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate(`/favorite`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5 my-5 lg:h-[75vh] flex items-center">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl mx-auto ">
        {/* Movie Poster */}
        <figure className="w-full lg:w-1/3">
          <img
            src={posterUrl}
            alt="Movie Poster"
            className="object-cover h-full rounded-l-md"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body p-6 lg:w-2/3 space-y-4">
          {/* Movie Title */}
          <h2 className="card-title text-2xl font-bold">
            {title}
          </h2>

          {/* Movie Details */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Genre:</span> {genre}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {duration} min
            </p>
            <p>
              <span className="font-semibold">Release Year:</span> {releaseYear}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {rating} (Out of 5)
            </p>
            <p className="line-clamp-3">
              <span className="font-semibold">Plot Summary:</span> {summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="card-actions flex-wrap gap-4">
            <button className="btn btn-success" onClick={handleFavorite}>
              Add to Favorite
            </button>
            <button
              className="btn btn-info"
              onClick={() => navigate(`/updateMovies/${_id}`)}
            >
              Update
            </button>
            <button className="btn btn-error" onClick={() => handleDelete(_id)}>
              Delete Movie
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/allMovies")}
            >
              All Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
