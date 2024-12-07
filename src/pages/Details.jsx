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
    <div className="w-full md:w-10/12 md:mx-auto p-5 my-5">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={posterUrl} alt="Album" />
        </figure>
        <div className="card-body space-y-3">
          <h2 className="card-title">{title}</h2>
          <div>
            <p>Genre: {genre}</p>
            <p>Duration: {duration}</p>
            <p>Release Year: {releaseYear}</p>
            <p>Rating : {rating} (Out of 5)</p>
            <p>Plot Summary: {summary}</p>
          </div>

          <div className="card-actions ">
            <button className="btn btn-success" onClick={handleFavorite}>
              Add to Favorite
            </button>
            <button className="btn btn-error" onClick={() => handleDelete(_id)}>
              Delete Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
