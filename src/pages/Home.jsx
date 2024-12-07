import { useLoaderData } from "react-router-dom";

export default function Home(){
    const movies = useLoaderData()
    return (
        <div className= 'w-full md:w-10/12 md:mx-auto p-5' >
            {movies.map((movie) => (
                <div key={movie._id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.genre}</p>
                    <p>{movie.duration}</p>
                    <p>{movie.releaseYear}</p>
                    <p>{movie.rating}</p>
                </div>
            ))}
        </div>
    );
}