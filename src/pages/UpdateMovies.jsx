import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import RatingComponent from "../components/RatingComponent";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

export default function UpdateMovies() {
  const movie = useLoaderData();
  const {
    _id,
    title,
    posterUrl,
    genre,
    duration,
    releaseYear,
    summary,
    rating,
    email,
  } = movie || {};
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || "",
      posterUrl: posterUrl || "",
      genre: genre || "",
      duration: duration || "",
      releaseYear: releaseYear || "",
      summary: summary || "",
      rating: rating || 0,
      email: email || "",
    },
  });

  const onSubmit = (data) => {
    const updatedData = { ...data, email: user.email };

    fetch(`http://localhost:5000/movies/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {        
        
        if (data.modifiedCount) {
          navigate("/allMovies");
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

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  return (
    <div className="w-full md:w-10/12 md:mx-auto p-5">
      {/* form start */}

      <form
        className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Movie</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter movie title"
            className="input input-bordered"
            {...register("title", {
              required: "This field is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-500 m-2">** {errors.title.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Poster URL</span>
          </label>
          <input
            type="url"
            placeholder="Enter poster URL"
            className="input input-bordered"
            {...register("posterUrl", {
              required: "This field is required",
              pattern: {
                value: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i,
                message: "Please enter a valid URL",
              },
            })}
          />
          {errors.posterUrl && (
            <span className="text-red-500 m-2">
              ** {errors.posterUrl.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Genre</span>
          </label>
          <select
            className="select select-bordered"
            {...register("genre", { required: true })}
          >
            <option disabled>Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Duration (minutes)</span>
          </label>
          <input
            type="number"
            placeholder="Enter duration"
            className="input input-bordered"
            {...register("duration", {
              required: "Duration is required",
              validate: (value) =>
                value > 60 || "Duration must be greater than 60 minutes",
            })}
          />
          {errors.duration && (
            <p style={{ color: "red" }}>{errors.duration.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Release Year</span>
          </label>
          <select
            className="input input-bordered"
            {...register("releaseYear", {
              required: "Release year is required",
              validate: (value) => value !== "" || "Please select a valid year",
            })}
          >
            <option value="" disabled>
              Select Release Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <p style={{ color: "red" }}>{errors.releaseYear.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Please provide a rating" }}
            render={({ field: { value, onChange } }) => (
              <RatingComponent value={value} onChange={onChange} />
            )}
          />

          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea
            placeholder="Write a brief summary"
            className="textarea textarea-bordered"
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters",
              },
            })}
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        <div className="form-control">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>

      {/* form end */}
    </div>
  );
}
